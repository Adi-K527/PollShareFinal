import Header from "../components/Header"
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [message, setMessage] = useState("")

  useEffect(() => {

  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("https://pollsharev2.onrender.com/api/user/register", {
      method: "POST",
      headers: {
				'Content-Type': 'application/json',
			},
      body: JSON.stringify({
				username,
				password,
			}),
    })

    const data = await res.json()
    console.log(data._id)
    
    if (data._id){
      console.log("ya")
      navigate('/')
    }
    else {
      setMessage("Username is already taken")
    }
  }

  return (
    <div className="min-h-screen w-full bg-stone-300 flex flex-col shadow-lg">
      <Header />
      <div className=" bg-white mt-10 mx-auto w-1/4 rounded-lg">
        <form onSubmit={onSubmit}>
          <h1 className="mt-2 mb-10 text-center text-3xl text-zinc-700 font-semibold">Sign Up</h1>
          <div className="mx-auto w-2/3 mb-3 mt-3">
            <input className="w-full border-b border-b-slate-400 text-lg" type="text" name="username" value={username} placeholder='Enter a username' onChange={(e) => (setUsername(e.target.value))}/>
          </div>
          <div className="mx-auto w-2/3 mb-5">
            <input className="w-full border-b border-b-slate-400 text-lg" type="password" value={password} placeholder='Enter a password' onChange={(e) => (setPassword(e.target.value))}/>
          </div>
          <div className="w-1/3 mx-auto text-lg">
            <button className="w-full mx-auto bg-sky-900  rounded-md text-white mb-3 hover:bg-sky-700" type="submit">Sign Up</button>
          </div>
          <div className="w-full text-center mb-5">
            <a href="/" className="text-indigo-700 mx-auto hover:text-indigo-900">Back to login</a>
          </div>
        </form>
        <div className="w-full text-center mb-5">
          <p className="text-red-600 mx-auto">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Signup