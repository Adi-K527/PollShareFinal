import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"


const SinglePost = ({post, page}) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [createdArr, setCreatedArr] = useState("")
  const [answeredArr, setAnsweredArr] = useState("")
  const [realPost, setRealPost] = useState({title: "", questions: [], numAnswers: 0, comments: []})
  

  const getUser = async () => {
    const res = await fetch("http://localhost:5000/api/user/" + post.creator, {
        method: "GET",
    })
    const data = await res.json()
    setUsername(data.username)
    for (let i = data.createdPosts.length; i > data.createdPosts.length - 5; i--){
        setCreatedArr(answeredArr, data.createdPosts[i])
    }
    for (let i = data.createdPosts.length; i > data.createdPosts.length - 5; i--){
        setCreatedArr(answeredArr, data.createdPosts[i])
    }
  }

  const getRealPost = async() => {
    const res = await fetch("http://localhost:5000/api/post/" + post._id, {
      method: "GET"
    })
    const postData = await res.json()
    setRealPost(postData)
  }

  useEffect(() => {
    getUser()
    getRealPost()
  }, [])


  return (
    <div className="flex h-1/8">
        <div className="bg-gray-800 mt-2 hover:bg-slate-200 w-2" />
        <div className="bg-white mt-2 hover:bg-slate-200 w-full" onClick={() => (navigate("/" + page + "/" + post._id))}>
            <div className="flex w-full mb-3 mt-2">
                <h3 className=" ml-2 text-3xl font-semibold mb-2">{realPost.title}</h3>
            </div>
            <div className="flex ml-5 gap-32 mb-1">
                {post.numAnswers === 1 ? <p className="font-semibold">{realPost.numAnswers} submission</p> : <p className="font-semibold">{realPost.numAnswers} submissions</p>}  
                {post.comments.length === 1 ? <p className="font-semibold">{realPost.comments.length} comment</p> : <p className="font-semibold">{realPost.comments.length} comments</p>}
                <p className="ml-auto mr-5 text-sm text-gray-600 mt-1">Created by {username}</p>
            </div>
        </div>
    </div>

  )
}

export default SinglePost