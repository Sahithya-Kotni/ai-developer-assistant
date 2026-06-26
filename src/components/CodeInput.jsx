function CodeInput({ code, setCode }) {
  return (
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder="Paste your code here..."
      rows="15"
    />
  );
}

export default CodeInput;