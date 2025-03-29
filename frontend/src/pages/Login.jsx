import { useState, useEffect } from "react"
import {FaSignInAlt} from "react-icons/fa"
import {  useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {

    if(isError) {
      toast.error(message)
    }

    if(user) {
      navigate('/')
    }
    
    dispatch(reset())
  }, [ isError,  message,  dispatch , user, navigate])
  

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const {email, password} = formData

  const onChange = (e)=>{
    setFormData((prevStat)=>({
      ...prevStat,
      [e.target.name]:[e.target.value]
    }))
  }

  const onSubmit = (e)=>{
    e.preventDefault()
    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner />
  }

  // if(isSuccess || user) {
  //   return <Navigate to='/' />
  // } // this is not working

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          
          <div className="form-group">
          <input type="email"
          className="form-control"
          id="email" 
          name="email" 
          value={email}
          placeholder="Enter Your Email" 
          onChange={onChange}
          />
          </div>
          <div className="form-group">
          <input type="password"
          className="form-control"
          id="password" 
          name="password" 
          value={password} 
          placeholder="Enter Password" 
          onChange={onChange}
          />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
