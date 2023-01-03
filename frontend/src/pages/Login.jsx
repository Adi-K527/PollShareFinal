import Header from "../components/Header"
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("https://pollsharev2.onrender.com/api/user/login", {
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

    if (data._id){
      localStorage.setItem("user", data._id)
      navigate('/home')
    }
    else {
      setMessage("Invalid Credentials")
    }
  }

  return (
    <div className="min-h-screen w-full bg-stone-300 flex flex-col">
      <Header />
      <div className="bg-white mt-10 mx-auto w-1/4 rounded-lg">
        <form onSubmit={onSubmit}>
          <h1 className="mt-2 mb-10 text-center text-3xl text-zinc-700 font-semibold">Login</h1>
          <div className="mx-auto w-2/3 mb-3 mt-3">
            <input className="w-full border-b border-b-slate-400 text-lg" type="text" name="username" value={username} placeholder='Username' onChange={(e) => (setUsername(e.target.value))}/>
          </div>
          <div className="mx-auto w-2/3 mb-5">
            <input className="w-full border-b border-b-slate-400 text-lg" type="password" value={password} placeholder='Password' onChange={(e) => (setPassword(e.target.value))}/>
          </div>
          <div className="w-1/3 mx-auto text-lg">
            <button className="w-full mx-auto bg-sky-900  rounded-md text-white mb-3 hover:bg-sky-700 " type="submit">LOGIN</button>
          </div>
          <div className="w-full text-center mb-5">
            <a href="/signup" className="text-indigo-700 mx-auto hover:text-indigo-900">Dont have an account?</a>
          </div>          
        </form>
        <div className="w-full text-center mb-5">
          <p className="text-red-600 mx-auto">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Login