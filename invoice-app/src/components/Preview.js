import React, { useRef,useState,useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
// import { ReactToPdf } from 'react-to-pdf'
import Pdf from "react-to-pdf";
import jwt_decode from 'jwt-decode'
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import { email } from '../config/Myservice';
import { URL } from '../config/Url';

const options = {
    orientation: 'Landscape',
    unit: 'in',
    format: 'A4'
};

function Preview() {
    const { state } = useLocation();
    const [total,setTotal] = useState(0)
    const [data,setData] = useState({})

    const sendmail = () => {
        let abc =state.user.remail;
        console.log(abc);
        const input = document.getElementById("divToPrint");
        console.log(input);

        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 15, 40, 180, 160);
            const filedata = pdf.output("blob");
            // console.log(filedata);
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            email(formData,state.user.emaill,state.user.remail)
            // email(formData)
            // .then((res) => {
            //     console.log(res);
            // });
            // axios.post(`${URL}posts/email/${userprofile.email}/${state.user.remail}`,formData,{
            //     headers:{
        
            //         'Content-Type':"multipart/form-data"
            //     }
            // })
        });
    };


    useEffect(()=>{
        let token = localStorage.getItem('_token')
        let decode  = jwt_decode(token)
        setData(decode)
        console.log(decode);
        let sum = 0;
        state.user.product.forEach(ele=>
            sum+=ele.total
            )
            setTotal(sum)
       
    },[])
    const ref = useRef()
   
    console.log(state);
    return (
        <>
         
            <div className='container'>
                <nav className='navbar'>
                    <div className='container-fluid'>
                        <Link to='/dashboard' className='btn btn-warning' > Go Back</Link>
                        <button className='btn btn-success' onClick={sendmail}> Send Mail</button>
                        <Pdf targetRef={ref} filename={`_invoice.pdf`} options={options} >
                           {({toPdf}) => (
                              <button className='btn btn-success' onClick={toPdf}>Generate pdf</button>
                               )}
                              </Pdf>
                    </div>
                    </nav>
                    <div ref={ref} id='divToPrint'>
                    <nav>

                    <div className='container-fluid'  >
                        <img src="https://taimer.com/wp-content/uploads/2018/08/invoie_paid.jpg" height={'100px'} />
                        <h4>Invoice</h4>
                    </div>

                </nav>
                <div className='container-fluid' >
                    <div className='row m-0 border'>
                        <div className='col text-left ml-4'>
                            <h6>From</h6>
                            <h5>Firm Name - {data.firmname}</h5>
                            <h5>Firm Email - {state.user.email}</h5>
                            <h5>Mobile No- {data.mob}</h5>


                            <br />
                            <h6>To</h6>
                            <h5>Reviever Name- {state.user.rname}</h5>
                            <h5>Reviever Email - {state.user.remail}</h5>
                            <h5>Reviever Address - {state.user.add}</h5>
                        </div>
                        <div className='col text-right mr-4'>
                            <h6>Status</h6>
                            <h5>{state.user.status}</h5>
                            <h6>Date</h6>
                            <h5>{Date()}</h5>
                            <h6>Due Date</h6>
                            <h5>{state.user.date}</h5>
                            <h5>Amount</h5>
                            <h3>NGN {total}</h3>

                        </div>

                    </div>
                    <div className='container-fluid'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quntity</th>
                                    <th>Price</th>
                                    <th>Discount (%)</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.user.product.map((ele, index) =>
                                    <tr>
                                        <td>{ele.title}</td>
                                        <td>{ele.quantity}</td>
                                        <td>{ele.price}</td>
                                        <td>{ele.discount}</td>
                                        <td>{ele.total}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
                </div>
            </div>
        </>
    )
}

export default Preview
