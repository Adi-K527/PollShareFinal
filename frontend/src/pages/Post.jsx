import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header"


const Post = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  const [post, setPost] = useState({ title: "", questions: [] })
  const [answerVals, setAnswerVals] = useState([])
  const { id } = useParams();
  
  const getPost = async () => {
    const res = await fetch("http://localhost:5000/api/post/answer/" + id, {
      method: "GET", 
    })
    const data = await res.json()
    setPost(data)
  }

  useEffect(() => {
    getPost()
  }, [])

  const radioButtonSelect = (e) => {
    let arr = answerVals
    arr[e.target.name] = e.target.value
    setAnswerVals(arr)
    console.log(answerVals)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:5000/api/post/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        user,
        answerVals
      })
    })

    const data = await res.json()
    if (data) {
      console.log("ssdasd")
      navigate('/home')
    }
    else {
      console.log("sheeshee")
    }
  }


  return (
    <div className="min-h-screen w-full bg-stone-300">
      <Header />
      <div className="flex mt-5 ml-10 pl-10">
        <div className="w-2 bg-gray-800" />
        <div className=" w-3/4">
          <h1 className="ml-5 text-3xl font-semibold">{post.title}</h1>
        </div>
      </div>
      <div className=" w-full mx-auto">
        <form onSubmit={onSubmit}>
          {post.questions.map((question, index) => (
            <div className="w-2/5 mx-auto mt-3">
              <div className="w-full h-2 bg-gray-800"/>
              <div className="w-full bg-white">
                <h3 className="text-center text-2xl font-medium">{question.questiontitle}</h3>
                {question.answerchoices.map((choice, idx) => (
                <div className="ml-10">
                    <input className=" text-center" type="radio" value={idx} name={index} onChange={radioButtonSelect} required/>{choice.answerchoice}
                </div>
                ))}
              </div>
              <div className="w-full h-2 bg-white" />
            </div>
          ))}
          <div className="w-20 mx-auto">
            <button className="w-full mx-auto mt-3 text-lg bg-sky-900  rounded-md text-white mb-3 hover:bg-sky-700 " type="submit">Submit</button>
          </div>
          
        </form>
      </div>

    </div>
  )
}

export default Post