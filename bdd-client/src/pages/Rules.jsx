import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import "../App.css";

export default function Rules() {
    const [readable, setReadable] = React.useState("");
    const RULE_DOC = new URL("../assets/RULES.md", import.meta.url).href;

    React.useEffect(() => {
        fetch(RULE_DOC)
            .then((response) => response.text())
            .then((text) => setReadable(text));
    }, []);
    return (
        <>
            <main>
                <section>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                    >
                        {readable}
                    </ReactMarkdown>
                </section>
            </main>
        </>
    );
}
