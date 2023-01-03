import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Question from '../components/Question'
import Header from "../components/Header"

const Compose = () => {

  const [postTitle, setPostTitle] = useState("")
  const [questiontitle, setquestiontitle] = useState("")
  const [questions, setQuestions] = useState([])
  const [answerchoice, setAnswerchoice] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const createPost = async (e) => { 
    e.preventDefault()

    const userid = localStorage.getItem('user')
    let noAnswers = false
    questions.forEach(question => {
        if (question.answerchoices.length < 2){
            noAnswers = true
        }
    })

    if (postTitle === ""){
        setMessage("Post must have a title")
    }
    else if (questions.length === 0){
        setMessage("Post must have at least one question")
    }
    else if (noAnswers){
        setMessage("Questions in post must have at least two answer choices")
    }
    else{

        const res = await fetch("https://pollsharev2.onrender.com/api/post", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                postTitle,
                questions,
                userid
            })
        })
        const data = await res.json()
        console.log(data)
    
        if (data.message){
            setMessage(data.message)
        }
        else {
            navigate('/home')
        }
    }
  }


  const addQuestion = (e) => {
    e.preventDefault()
    const question = {
        questiontitle: questiontitle, 
        answerchoices: []
    }
    setQuestions([...questions, question])
    console.log(questions)
    setquestiontitle("")
  }

  return (
    <div className="min-h-screen w-full bg-stone-300">
        <Header />
        <a href="/home" className="mt-10 ml-10 text-lg font-medium text-gray-900 hover:text-indigo-600">Back</a>
        <div className="w-3/5 mx-auto mt-5">
            <div className=" w-1/2 mx-auto flex">
                <div className="w-2 bg-gray-800" />
                <input className="w-full mx-auto text-4xl ml-2 bg-stone-300 focus:outline-none font-bold" type="text" name="posttitle" value={postTitle} placeholder='Title of Post' onChange={(e) => (setPostTitle(e.target.value))} required/>
            </div>
            <br/><br/>
            {questions.map(question => (
                <div className="w-1/2 flex mx-auto mb-5">
                    <Question question={question}/>
                </div>
            ))}
            <div className="w-1/3 mx-auto mt-10">
                <div className="h-2 bg-gray-800 w-full" />
                <form onSubmit={addQuestion}>
                    <div className="flex">
                        <div className='w-full mx-auto'>
                            <input className="w-full text-2xl focus:outline-none text-center" type="text" name="question" value={questiontitle} placeholder='Question' onChange={(e) => (setquestiontitle(e.target.value))} required/>
                        </div>
                    </div>
                    <div className='w-3/5 mx-auto mt-2'>
                        <button className="w-full bg-sky-900 rounded-md mx-auto text-white text-lg mb-3 hover:bg-sky-700" type="submit">Add Question</button>
                    </div>
                </form>
            </div>
            <div className="w-1/6 mx-auto mt-10">
                <form onSubmit={createPost}>
                <button className="w-full bg-sky-900 rounded-md mx-auto text-white text-lg hover:bg-sky-700" type="submit">Save</button>
                </form>
            </div>
            <div className="w-1/2 mx-auto mt-2">
                <p>{message}</p>
            </div>
            

        </div>
    </div>
  )
}

export default Compose