import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

const DB_PATH = path.resolve(__dirname, "league.db");

async function connect() {
  return (await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  })) as Database;
}

async function close(db: Database) {
  await db.close();
}

async function performDbOperation<TArgs extends unknown[], TResult>(
  callback: (db: Database, ...args: TArgs) => TResult | Promise<TResult>,
  ...args: TArgs
): Promise<TResult> {
  const db = await connect();
  try {
    return await callback(db, ...args);
  } finally {
    await close(db);
  }
}

async function _getAll(db: Database, table: string) {
  return db.all(`SELECT * FROM ${table}`);
}

async function _getAllByField(
  db: Database,
  table: string,
  field: string,
  value: number | string
) {
  return db.all(`SELECT * FROM ${table} WHERE ${field} = ?`, value);
}

/**
 * Brought to you by the fine people behind GitHub Copilot:
 *
 * Dynamically finds records in a table based on provided search parameters.
 * Supports multiple fields, comparison operators, and ordering.
 *
 * @param db - The SQLite database instance.
 * @param table - The table to query.
 * @param params - An object where keys are field names and values are search criteria.
 *                 Values can be primitives for equality, or objects for advanced queries.
 * @param options - Optional query options (e.g., orderBy, limit).
 * @returns Array of matching records.
 *
 * Example usage:
 *   // Find all league winners
 *   await performDbOperation(_findBy, 'leagues', { winner: 'Team A' });
 *
 *   // Find all matchups between two teams
 *   await performDbOperation(_findBy, 'matchups', { home_team: 'Team A', away_team: 'Team B' });
 *
 *   // Find the highest scoring team in a given season
 *   await performDbOperation(_findBy, 'teams', { season: 2023 }, { orderBy: 'points DESC', limit: 1 });
 */
async function _find(
  db: Database,
  table: string,
  params: Record<string, string | number | number[]> = {},
  options?: { orderBy?: string; limit?: number }
) {
  // Build WHERE clause and values array
  const whereClauses: string[] = [];
  const values: any[] = [];

  for (const [field, value] of Object.entries(params)) {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        // Support for advanced multi-search queries, e.g., { teamId: [1, 2, 3]}
        whereClauses.push(`${field} in ?`);
        values.push(value);
      } else {
        // Support for advanced queries, e.g., { points: { $gt: 100 } }
        for (const [op, opValue] of Object.entries(value)) {
          switch (op) {
            case "$gt":
              whereClauses.push(`${field} > ?`);
              values.push(opValue);
              break;
            case "$gte":
              whereClauses.push(`${field} >= ?`);
              values.push(opValue);
              break;
            case "$lt":
              whereClauses.push(`${field} < ?`);
              values.push(opValue);
              break;
            case "$lte":
              whereClauses.push(`${field} <= ?`);
              values.push(opValue);
              break;
            case "$ne":
              whereClauses.push(`${field} != ?`);
              values.push(opValue);
              break;
            case "$like":
              whereClauses.push(`${field} LIKE ?`);
              values.push(opValue);
              break;
            // Add more operators as needed
            default:
              throw new Error(`Unsupported operator: ${op}`);
          }
        }
      }
    } else {
      // Simple equality
      // TODO: handle instances where manager selected but not a year
      //       will result in an array of teamIds
      whereClauses.push(`${field} = ?`);
      values.push(value);
    }
  }

  let query = `SELECT * FROM ${table}`;
  if (whereClauses.length > 0) {
    query += " WHERE " + whereClauses.join(" AND ");
  }
  if (options?.orderBy) {
    query += ` ORDER BY ${options.orderBy}`;
  }
  if (options?.limit) {
    query += ` LIMIT ${options.limit}`;
  }

  // Execute the query and return results
  return db.all(query, values);
}

async function _getDistinctValues(
  db: Database,
  table: string,
  fields: string[]
): Promise<any[]> {
  const fieldsToSelect = fields.length > 0 ? fields.join(", ") : "*";
  return db.all(`SELECT DISTINCT ${fieldsToSelect} FROM ${table}`);
}

export async function getDistinctValues(
  table: string,
  fields: string[]
): Promise<any[]> {
  return performDbOperation(_getDistinctValues, table, fields);
}

export async function getAll(table: string) {
  return performDbOperation(_getAll, table);
}

export async function getAllByField(
  table: string,
  field: string,
  value: number | string
) {
  return performDbOperation(_getAllByField, table, field, value);
}

export async function find(
  table: string,
  params: Record<string, string | number | number[]> = {},
  options?: { orderBy?: string; limit?: number }
) {
  return performDbOperation(_find, table, params, options);
}
