
const QA = ({question, id}) => {
  return (
    <div>
        <h3>{question.questiontitle}</h3>
        {question.answerchoices.map(answerchoice => (
            <div>
                <input type="radio" value={id} name={id} />
                <label for={id}>{answerchoice}</label>
            </div>
        ))}
    </div>
  )
}

export default QA