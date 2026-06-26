import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode, language }) {
  return (
    <Editor
      height="350px"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value || "")}
    />
  );
}

export default CodeEditor;