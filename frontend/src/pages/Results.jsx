import { useState, useEffect } from "react"
import Header from "../components/Header"
import Post from "../components/SinglePost"

const Results = () => {

    const userid = localStorage.getItem('user')
    const [createdPosts, setCreatedPosts] = useState([])
    const [didDelete, setDidDelete] = useState(false)
    const [answeredPosts, setAnsweredPosts] = useState([])
    const [user, setUser] = useState({username: "", createdPosts: [], answeredPosts: []})

    const getUser = async() => {
        const res = await fetch("https://pollsharev2.onrender.com/api/user/" + userid, {
            method: "GET",
        })
        const userData = await res.json()
        setUser(userData)
    }

    const getCreatedPosts = async (id) => {
        const res = await fetch("https://pollsharev2.onrender.com/api/post/" + id, {
            method: "GET",
        })
        const postData = await res.json()
        setCreatedPosts([...createdPosts, postData])
        console.log(createdPosts)
    }

    const getAnsweredPosts = async (id) => {
        const res = await fetch("https://pollsharev2.onrender.com/api/post/" + id, {
            method: "GET",
        })
        const postData = await res.json()
        setAnsweredPosts([...answeredPosts, postData])
        console.log(answeredPosts)
    }
    
    useEffect(() => {
        getUser()
    }, [didDelete])

    const deletePost = async (id) => {
        console.log(id)
        const res = await fetch("https://pollsharev2.onrender.com/api/post/" + id, {
            method: "DELETE",
        })
        const data = await res.json() 
        if (data){
           setDidDelete(!didDelete)
        }
    }

  return (
    <div className="min-h-screen w-full bg-stone-300">
        <Header />
        <a href="/home" className="mt-10 ml-10 text-lg font-medium text-gray-900 hover:text-indigo-600">Back</a>
        <div className="flex mt-10">
            <div className="flex h-7 w-1/6 ml-9">
                <div className="w-2 bg-gray-800" />
                <div className=" w-3/4">
                    <p className="ml-5 font-semibold">Created Posts</p>
                </div>
            </div>
            <div className="w-2/5 mx-auto mt-5">
                {user.createdPosts.map(post => (
                    <div>
                        <Post post={post} page="results"/>
                        <div className="w-full text-center">
                            <button className="w-1/4 mt-2 bg-red-600 rounded-md text-white text-lg mb-3 hover:bg-red-400" onClick={() => (deletePost(post._id))}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <br/><br/><br/><br/>

        <div className="flex mt-10">
            <div className="flex h-7 w-1/6 ml-10">
                <div className="w-2 bg-gray-800" />
                <div className="w-3/4">
                    <p className="ml-5 font-semibold">Answered Posts</p>
                </div>
            </div>
            <div className="w-2/5 mx-auto mt-5">
                {user.answeredPosts.map(post => (
                    <Post post={post} page="results"/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Results