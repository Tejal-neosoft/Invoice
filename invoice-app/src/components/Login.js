import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getPost , validation } from '../config/Myservice'
import './Login.css'
function Login() {
    const navigate = useNavigate()
    const [state, setState] = useState({ data: [], email: '', pass: '' })
    const submit = (event) => {
     event.preventDefault()
        // let flag = true;
        // if (state.email !== '') {
        //     state.data.map(data => {
        //         if (state.email === data.email && state.pass === data.pass) {
        //             let arr = data
        //             alert("success")
        //             navigate('/dashboard')
        //             if (localStorage.getItem('user') !== undefined) {
        //                 localStorage.setItem('user', JSON.stringify(arr))                
        //                 }
        //             flag = false;

        //         }

        //     })
        // }
        // else {
        //     alert("Enter correct details")
        // }
        // if(flag){
        //     alert("Email or Password does not match")
        //   }
        validation({email:state.email,pass :state.pass})
        .then(res=>{
            if(res.data.err==0){
               localStorage.setItem("_token",res.data.token);
               localStorage.setItem('cart',JSON.stringify([]));
               navigate("/dashboard")
            }
            if(res.data.err==1){
                console.log(res.data)
                alert("Email or Password does not match")
            }
        })
        
    }
    
    const handle = (event) => {
        const { name, value } = event.target
        setState({ ...state, [name]: value })
    }
   
    // useEffect(() => {
    //     getPost().then(res => {
    //         setState({ ...state, data: res.data })
    //     })
    // }, [])

    return (

        <>
        <div className="container">

            <div className="container-justify log">
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label>Email Adddress</label>
                        <input type="text" name="email" className="form-control" placeholder="Enter your Email Address" value={state.email} onChange={handle} />


                    </div>
                    <div className="form-group ">
                        <label>Password </label>
                        <input type="password" name="pass" className="form-control" placeholder="Enter your Password" value={state.pass} onChange={handle} />

                    </div>
                    <button type="submit" className="btn btn-success">Login</button>
                </form>
                <div className="mt-5 " style={{ letterSpacing: '1px' }}><p>New User? Click here to  <i><Link to="/register">Register</Link></i></p></div>
            </div>

        </div>

    </>
    )
}

export default Login
