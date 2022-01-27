import React from 'react'
import {Link} from 'react-router-dom'
function Nav() {
    const logout = () =>{
        alert("Logout")
        localStorage.removeItem('_token')
    }
    return (
        <>
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
          <a className="navbar-brand ml-4" href="/dashboard">Invoice App</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ml-2">
              <li className="nav-item ml-5">
                <Link className="btn btn-success" to='/settings'>Settings </Link>
              </li>
              <li className="nav-item">
                <Link className="ml-3 btn btn-success" to='/addinvoice'>Add Invoice </Link>
              </li>
  
            </ul>
            <Link to="/" onClick={()=>logout()}className="btn btn-danger">Logout</Link>
          </div>
        </nav>
      </>
    )
}

export default Nav
