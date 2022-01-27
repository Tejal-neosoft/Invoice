import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { addPost } from '../config/Myservice';
import './Register.css'
var mailformat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
var passFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
var userFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
var mobileRegex = /^[7-9][0-9]{9}$/;
function Register() {
    const navigate = useNavigate()
    const [state,setState] = useState({name:'',firmname:'',username:'',email:'',pass:'',mob:'',cpass:'',errors:{name:'',email:'',firmname:'',pass:'',cpass:'',username:'',mob:''}})

    const handler=(e)=>{
        const {name,value} = e.target;
        let errors = state.errors
        switch (name) {
            case 'name':
                errors.name = value.length > 3 ? '' : 'Name Should be greater than 3 letters';
                break;
            case 'email':
                errors.email = mailformat.test(value) ? '' : 'Email is not valid';
                break;
            case 'firmname':
                errors.firmname =value.length > 3 ? '' : 'Name Should be greater than 3 letters';
                break;
            case 'username':
                errors.username = userFormat.test(value) ? '' : 'Username should be more than 5 Characters with First Letter capital,it must contain a special character and numbers ';
                break;
            case 'pass':
                    errors.pass = passFormat.test(value) ? '' : "Password should be more than 8 Characters with First Letter capital,it must contain a special character and numbers ";
                break;  
            case 'cpass' : 
            errors.cpass = state.pass === value ? '' : 'Password And Confirm Password Should Be Same';
            break;
            case 'mob':
                errors.mob = mobileRegex.test(value) ? '' : "Mobile Number should be valid";
                break;
    
            default:




        }
        setState({...state,[name]:value,errors:errors})


    }

    const submit=(event)=>{
        event.preventDefault()

        if(validate(state.errors)){
            if(state.name!==""){
            alert("Success")
            console.log(state);
            let formData = {name:state.name,firmname:state.firmname,email:state.email,username:state.username,pass:state.pass,cpass:state.cpass,mob:state.mob}
        
            addPost(formData)
            navigate('/')
        }
        else{
            alert("Enter Values")
        }

        }
        else{
            alert("Failed")
        }
        
    }
    const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) =>
            val.length > 0 && (valid = false));
        return valid;

    }





    return (
        <>
        <div className="container boxr ">
            <div className="container iboxr" >
                
                <form onSubmit={submit}>
                   <div >
                        <div className="form-group ">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" placeholder="Enter your  Full Name" value={state.name}  onChange={handler}/>
                            {state.errors.name && <p className="alert alert-danger error">{state.errors.name}</p>}

                        </div>
                        <div className="form-group ">
                            <label>Firm Name</label>
                            <input type="text" name="firmname" className="form-control" placeholder="Enter your  Firm Name"  value={state.firmname}  onChange={handler} />
                            {state.errors.firmname && <p className="alert alert-danger error">{state.errors.firmname}</p>}

                        </div>
                        <div className="form-group ">
                            <label>User Name</label>
                            <input type="text" name="username" className="form-control" placeholder="Enter your  User Name"  value={state.username}  onChange={handler} />
                            {state.errors.username && <p className="alert alert-danger error">{state.errors.username}</p>}

                        </div>
                         <div className="form-group ">
                            <label>Mobile No</label>
                            <input type="number" name="mob" className="form-control" placeholder="Enter your  Mobile number"  value={state.mob}  onChange={handler} />
                            {state.errors.mob && <p className="alert alert-danger error">{state.errors.mob}</p>}

                        </div>
                        <div className="form-group ">
                            <label>Email Adddress</label>
                            <input type="text" name="email" className="form-control" placeholder="Enter your Email Address"  value={state.email}  onChange={handler}/>
                            {state.errors.email && <p className="alert alert-danger error">{state.errors.email}</p>}


                        </div> 
                      
                        <div className="form-group ">
                            <label>Password </label>
                            <input type="password" name="pass" className="form-control" placeholder="Enter your Password"  value={state.pass}  onChange={handler}/>
                            {state.errors.pass && <p className="alert alert-danger error">{state.errors.pass}</p>}

                        </div> 
                        <div className="form-group ">
                            <label> Confirm Password </label>
                            <input type="password" name="cpass" className="form-control" placeholder="Confirm Password"  value={state.cpass}  onChange={handler}/>
                            {state.errors.cpass && <p className="alert alert-danger error">{state.errors.cpass}</p>}

                        </div>
                        <button type="submit" className="btn btn-success">Register</button>

                        <div className="container m-2"> Already Register?? Click Here to <Link to="/">Login</Link></div>
                   </div>
                </form>

            </div>
        </div>
    </>
    )
}

export default Register
