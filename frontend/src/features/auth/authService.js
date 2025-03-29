import axios from 'axios'

const API_URL = '/api/users/'

//Register User
const register = async (userData)=>{
    const response = await axios.post(API_URL, userData)
    
    if(response.data){
        localStorage.setItem('user' , JSON.stringify(response.data))
    }
    return response.data
}

//Register User
const login = async (userData)=>{
    console.log('Sending user data:', userData);
    const data = {
        email: userData.email[0],
        password: userData.password[0]
    }
    console.log(data)
    const response = await axios.post(API_URL + 'login', data)
    
    if(response.data){
        localStorage.setItem('user' , JSON.stringify(response.data))
    }
    return response.data
}

// Logout User
const logout = ()=>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
}

export default authService