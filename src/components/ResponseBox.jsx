import ReactMarkdown from "react-markdown";

function ResponseBox({ response }) {
  return (
    <div className="response-box">
      <ReactMarkdown>{response}</ReactMarkdown>
    </div>
  );
}

export default ResponseBox;