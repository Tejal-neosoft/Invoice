import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import { useNavigate } from 'react-router'
import jwt_decode from 'jwt-decode'
import { deleteInvoice, Updatepost, fetchproduct } from '../config/Myservice'
export default function Dashboard() {
    const navigate = useNavigate()
    const [flag,setFlag] = useState(false)
    const [refresh, setrefresh] = useState(true)
    const [state, setstate] = useState({
        paymentReceived: 0,
        pendingAmount: 0,
        totalAmount: 0,
        paidInvoice: 0,
        unpaidInvoice: 0,
        totalInvoice: 0,
        invoices: []

    })
    const deleteEle = (item) => {
        deleteInvoice(item)
        setrefresh(!refresh)
    }
    const updateInvoice = (item) => {
        Updatepost(item)
        setrefresh(!refresh)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        // eslint-disable-next-line eqeqeq
        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            // setUid(decode)
            let data = []
            await fetchproduct({ email: decode.email }).then(res => {
                data = [...res.data]
                console.log(res.data)
            })
            // setstate({...state,invoices:data})
            let sumOfTotal = 0;
            let upaid = 0;
            let pamount = 0;
            let totalinvoice = 0;

            data.forEach(ele => {
                console.log(ele)

                totalinvoice += 1
                if (ele.status === 'UNPAID') {
                    upaid += 1
                    console.log('inside status');
                    ele.product.map(item => {
                        sumOfTotal += item.total
                        pamount += item.total


                    })
                }
                else {
                    ele.product.map(item => {
                        sumOfTotal += item.total
                    })

                }

                console.log(sumOfTotal, "Sum of total")




                // setstate({...state,totalAmount:ele.product.total})
            })

            setstate({
                invoices: data,
                paymentReceived: sumOfTotal - pamount,
                pendingAmount: pamount,
                totalAmount: sumOfTotal,
                paidInvoice: totalinvoice - upaid,
                unpaidInvoice: upaid,
                totalInvoice: totalinvoice,
            })
        }
    }, [refresh])
    return (
        <div>
            <Nav />
            {/* <h2>Dashboard</h2> */}

            <div className="container border p-5 mt-3" style={{boxShadow:'5px 10px 8px 10px #888888',backgroundColor:'mintcream'}}>
                <div className="row ">
                    <div className="col mt-3">
                        <div class="card " style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Payment Received</h5>
                                <h6 class="card-subtitle mb-2 text-muted mt-3">Rs. {state.paymentReceived}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col  mt-3">
                        <div class="card" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Pending Amount</h5>
                                <h6 class="card-subtitle mb-2 text-muted mt-3">Rs. {state.pendingAmount}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col  mt-3">
                        <div class="card" style={{ width: "18rem"}}>
                            <div class="card-body">
                                <h5 class="card-title">Total Amount</h5>
                                <h6 class="card-subtitle mb-2 text-muted mt-3">Rs. {state.totalAmount}</h6>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
                {/* <div className="row"> */}
                    <div className="col  mt-3">
                        <div class="card" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Paid Invoice</h5>
                                <h6 class="card-subtitle mb-2 text-muted mt-3">{state.paidInvoice}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col mt-3">
                        <div class="card" style={{ width: "18rem"}}>
                            <div class="card-body">
                                <h5 class="card-title">Unpaid Invoice</h5>
                                <h6 class="card-subtitle mb-2 text-muted mt-3">{state.unpaidInvoice}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col mt-3">
                        <div class="card" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Total Invoice</h5>
                                <h6 class="card-subtitle mb-2 text-muted mt-3">{state.totalInvoice}</h6>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <button className='mt-4 btn btn-primary' onClick={()=>setFlag(!flag)}>Show Invoices</button>
            {flag?
            <div className="container mt-5">
                <table className='table'>
                    <thead className='bg-warning' style={{letterSpacing:'1px'}}>
                        <tr>
                            <th>Sr No.</th>
                            <th>Reciever's Name</th>
                            <th>Reciever's Due Date</th>
                            <th>Reciever's email</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>

                    <tbody>
                        {state.invoices.map((ele, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{ele.rname}</td>
                                <td>{ele.date}</td>
                                <td>{ele.remail}</td>
                                <td>{ele.status}</td>
                                <td><button className="btn btn-success" onClick={() => navigate('/preview', { state: {user:ele}})}>Preview</button>
                                <button className="btn btn-info ml-2 mt-0" onClick={() => updateInvoice(ele)}>Update</button>
                                <button className="btn btn-danger ml-2" onClick={() => deleteEle(ele)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>:null}
        </div>
    )
}