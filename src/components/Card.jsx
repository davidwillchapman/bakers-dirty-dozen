export function Card(props) {
    const Comp = props.component;
    return (
        <>
            <div className="card">
                <Comp props={props.props}></Comp>
            </div>
        </>
    );
}
