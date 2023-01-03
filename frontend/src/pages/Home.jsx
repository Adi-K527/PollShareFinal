import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Post from "../components/SinglePost"

const Home = () => {

    const navigate = useNavigate()
    const userid = localStorage.getItem('user')
    const [posts, setPosts] = useState([])
    const [username, setUsername] = useState("")
    const [user, setUser] = useState({username: "", createdPosts: [], answeredPosts: []})

    const fetchData = async() => {
        const res = await fetch("http://localhost:5000/api/post/user/" + userid, {
            method: "GET",
        })
        const postsData = await res.json()
        setPosts(postsData)
    }

    const getUser = async () => {
        const res = await fetch("http://localhost:5000/api/user/" + userid, {
            method: "GET",
        })
        const data = await res.json()
        setUser(data)
    }
    
    useEffect(() => {
        getUser()
        fetchData()
    }, [])

  return (
    <div className="min-h-screen w-full bg-stone-300">
        <Header />
        <div className="flex mt-10 w-full h-full">
            <div className="w-1/6 ml-10">
                <div className="h-3 bg-gray-800" />
                <div className="bg-white hover:bg-slate-200 mb-2" onClick={() => (navigate("/results"))}>
                    <h3 className="text-center text-2xl font-semibold">{user.username}'s Profile</h3>
                    <br/>
                    {user.createdPosts.length > 0 && <h3 className="ml-3 font-medium">Created Posts:</h3>}
                    <ul className="ml-3 mb-2">
                        {user.createdPosts.map(post => (
                            <li>- {post.title}</li>
                        ))}
                    </ul>
                    {user.answeredPosts.length > 0 && <h3 className="ml-3 font-medium">Answered Posts:</h3>}
                    <ul className="ml-3 mb-2">
                        {user.answeredPosts.map(post => (
                            <li>- {post.title}</li>
                        ))}
                    </ul>
                </div>
                <div className="w-1/2 mx-auto">
                    <button className="w-full mt-5 my-1 mx-auto bg-sky-900 rounded-md text-white text-lg mb-3 hover:bg-sky-700" onClick={() => (navigate("/compose"))}>+ Create</button>
                </div>
            </div>
            
            <div className="w-2/5 mx-auto mt-5">
                {posts.length === 0 && <p className="text-center">No posts to be displayed. Click on your profile to view results.</p>}
                {posts.map(post => (
                    <Post post={post} page="post"/>
                ))}
            </div>
        </div>

    </div>
  )
}

export default Home