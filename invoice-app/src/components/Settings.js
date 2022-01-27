import React,{useState,useEffect} from 'react'
import Nav from './Nav'
import jwt_decode from 'jwt-decode'
import { UserData } from '../config/Myservice'
import './Settings.css'

function Settings() {
    const [data,setData] = useState({})
    const [flag,setFlag] = useState(false)
    const [count, setcount] = useState(0)
    const [state, setstate] = useState({})
    // const [state,setState] = useState({name:'',firmname:'',email:'',mob:''})
    useEffect(()=>{
        let token = localStorage.getItem('_token')
        let decode  = jwt_decode(token)
        setData(decode)
        setstate(decode)
        console.log(decode);
       
    },[count])
    
 const handler = (e) =>{
    const {name,value} = e.target;
    setstate({...state,[name]:value})

 }
 const edit = () =>{
    let formData = {
        id:state.id,
        name:state.name,
        email:state.email,
        mob: state.mob,
        firmname:state.firmname
      }
         UserData(formData).then(res=>{
             setcount(count+1)
             console.log(res.data)
             localStorage.setItem("_token",res.data.token);

         })
        setFlag(false)
    //  UserData(data)

 }
    return (
        <>
            <Nav/>
            <div className='container text-left data' style={{letterSpacing:'1px'}}>
                <h4 className='text-center'>Firm Data</h4>
                <p style={{fontSize:'19px'}}><b>Name-</b>{data.name}</p>
                <p style={{fontSize:'19px'}}><b>Email-</b>{data.email}</p>
                <p style={{fontSize:'19px'}}><b>Mobile-</b>{data.mob}</p>
                <p style={{fontSize:'19px'}}><b>Firmname-</b>{data.firmname}</p>
               
            </div>
           
            <button className='btn btn-warning mt-3' onClick={()=>setFlag(!flag)}>Update</button>

{flag?
            <div className='container'>
            <form onSubmit={edit}>
                   <div className='box'>
                        <div className="form-group ">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" placeholder="Enter your  Full Name" value={state.name}  onChange={handler}/>
                            {/* {state.errors.name && <p className="alert alert-danger error">{state.errors.name}</p>} */}

                        </div>
                        <div className="form-group ">
                            <label>Firm Name</label>
                            <input type="text" name="firmname" className="form-control" placeholder="Enter your  Firm Name"  value={state.firmname}  onChange={handler} />
                            {/* {state.errors.firmname && <p className="alert alert-danger error">{state.errors.firmname}</p>} */}

                        </div>
                      
                       
                         <div className="form-group ">
                            <label>Mobile No</label>
                            <input type="number" name="mob" className="form-control" placeholder="Enter your  Mobile number"  value={state.mob}  onChange={handler} />
                            {/* {state.errors.mob && <p className="alert alert-danger error">{state.errors.mob}</p>} */}

                        </div>
                        <div className="form-group ">
                            <label>Email Adddress</label>
                            <input type="text" name="email" className="form-control" placeholder="Enter your Email Address"  value={state.email}  onChange={handler}/>
                            {/* {state.errors.email && <p className="alert alert-danger error">{state.errors.email}</p>} */}


                        </div> 
                      
                       
                        <button type="submit" className="btn btn-success w-25 mt-3">Edit</button>

                   </div>
                </form>
            </div>:null}
        </>
    )
}

export default Settings
