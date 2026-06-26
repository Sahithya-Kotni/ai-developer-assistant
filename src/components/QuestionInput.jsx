function QuestionInput({ question, setQuestion }) {
  return (
    <textarea
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      placeholder="Ask anything about your code..."
    />
  );
}

export default QuestionInput;