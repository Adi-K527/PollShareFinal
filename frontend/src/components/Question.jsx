import {useState} from "react"

const Question = ({question}) => {

  const [newanswerchoice, setNewanswerchoice] = useState("")

  const addAnswerChoice = (e) => {
    e.preventDefault()
    question.answerchoices.push({answerchoice: newanswerchoice, numanswers: 0})
    console.log(question.answerchoices)
    setNewanswerchoice("")
  }

  return (
    <div className="w-full mx-auto">
      <div className="bg-gray-800 h-2"/>
      <div className="bg-white w-full">
        <h4 className="text-center text-2xl font-bold mb-3">{question.questiontitle}</h4>
        {question.answerchoices.map(choice => (
            <p className="ml-10">- {choice.answerchoice}</p>
        ))}
        <div className="w-full mx-auto">
          <form onSubmit={addAnswerChoice}>
            <div className="w-1/2 mx-auto">
              <input className="w-full mx-auto mb-2 mt-2 text-center border border-zinc-700 rounded-sm" type="text" name="answerchoice" value={newanswerchoice} placeholder='Answer Choice' onChange={(e) => (setNewanswerchoice(e.target.value))}/>
            </div>
            <div className="w-1/3 mx-auto">
              <button className="w-full mx-auto bg-sky-900 rounded-md text-white text-md mb-3 hover:bg-sky-700" type="submit">Add Answer Choice</button>
            </div>
              
          </form>
        </div>

      </div>
        
    </div>
  )
}

export default Question