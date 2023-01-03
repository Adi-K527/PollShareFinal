import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header"


const Postresults = () => {

  const { id } = useParams();
  const userid = localStorage.getItem('user')
  const navigate = useNavigate()


  const [post, setPost] = useState({ title: "", questions: [], comments: [] })
  const [userName, setUserName] = useState("")
  const [comment, setComment] = useState("")
  const [didComment, setDidComment] = useState(false)
  

  const getPost = async () => {
    const res = await fetch("http://localhost:5000/api/post/" + id, {
        method: "GET",
    })
    const data = await res.json()
    setPost(data)
  }

  const getUser = async() => {
    const res = await fetch("http://localhost:5000/api/user/" + userid, {
        method: "GET"
    })
    const user = await res.json()
    setUserName(user.username)
  }

  const getChartData = (question) => {
    let labels = []
    let Data = []
    question.answerchoices.forEach(answerchoice => {
        labels.push(answerchoice.answerchoice)
        Data.push(answerchoice.numanswers)
    }) 
    const datasets = [{label: question.questiontitle, data: Data, backgroundColor: "rgba(12, 74, 110, 1)"}]

    const chartData = `{type: 'bar', data: {labels: ${JSON.stringify(labels)}, datasets: ${JSON.stringify(datasets)}}}`;
    return `https://quickchart.io/chart?c=${chartData}`
  }

  const sendComment = async () => {

    const res = await fetch("http://localhost:5000/api/post/" + id, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            creator: userName,
            comment: comment
        })
    })
    const data = await res.json()
    if (didComment){
        setDidComment(false)
    }
    else {
        setDidComment(true)
    }
  }

  useEffect(() => {
    getPost()
    getUser()
  }, [didComment])



  return (
    <div className="min-h-screen w-full bg-stone-300">
      <Header />
      <a href="/home" className="mt-5 ml-10 text-lg font-medium text-gray-900 hover:text-indigo-600">Back</a>
        {post.questions.map((question) => (
          <div className="w-1/2 mt-5 mx-auto">
            <div className="w-full h-3 bg-gray-800" />
            <div className="w-full bg-white">
                <h3 className="text-center text-2xl font-semibold">{question.questiontitle}</h3>
                <img src={getChartData(question)} />
            </div>
          </div>
        ))}
        <br/><br/>
        <div className="w-3/5 mx-auto mt-5">
          <form onSubmit={sendComment}>
            <div className="w-1/2 mx-auto">
              <input className="text-lg w-3/4 h-7" type="text" name="comment" value={comment} placeholder='comment' onChange={(e) => (setComment(e.target.value))}/>
              <button className="bg-sky-900 text-lg w-1/4 rounded-md text-white mb-3 hover:bg-sky-700" type="submit">Send</button>
            </div>
          </form>
          {post.comments.map((comment) => (
            <div className="w-1/2 h-full bg-white mx-auto mt-3">
              <div className="w-full h-2 bg-gray-800"/>
              <p className="h-5 ml-3 text-sm text-right mr-2 text-gray-600"><strong>{comment.creator}'s comment</strong></p>
              <p className="text-xl ml-10 mt-2">{comment.comment}</p>
              <div className="w-full h-5 bg-white" />
            </div>
          ))}
        </div>

        
    </div>
  )
}


export default Postresults