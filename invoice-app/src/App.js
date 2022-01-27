import React,{Suspense} from 'react';
import './App.css';
import {BrowserRouter , Route,Routes} from 'react-router-dom';
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const AddInvoice = React.lazy(() => import('./components/AddInvoice'));
const Preview = React.lazy(() => import('./components/Preview'));
const Settings = React.lazy(() => import('./components/Settings'));
// import Login from './components/Login';
// import Register from './components/Register';
function App() {
  return (
    <div className="App">
       <Suspense fallback={<div><img src="https://c.tenor.com/ZgIRCUMksogAAAAM/sing-crayon-shin-chan.gif"/></div>}>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/addinvoice' element={<AddInvoice/>} />
          <Route path='/preview' element={<Preview/>} />
          <Route path='/settings' element={<Settings/>} />
        <Route path="*" element={<img src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif" alt="..." className="images"></img>}></Route>

        </Routes>

     </BrowserRouter>
     </Suspense>
     
    </div>
  );
}

export default App;
