import React, { useState ,useRef} from 'react'
import { addinvoice } from '../config/Myservice'
import jwt_decode from 'jwt-decode'
import Nav from './Nav'

function AddInvoice() {
  const [flag, setflag] = useState(false)
  const [productdata, setProductData] = useState([])
  const title = useRef(null)
  const quantity = useRef(0)
  const price = useRef(0)
  const discount = useRef(0)
  const rname = useRef(null)
  const add = useRef(null)
  const date = useRef(null)
  const remail = useRef(null)

  const submitproduct=()=>{
    const newproduct={
    title: title.current.value,
     quantity : parseInt(quantity.current.value),
     price : parseInt(price.current.value),
     discount :parseInt(discount.current.value),
     total:((price.current.value-(price.current.value * discount.current.value /100)) * quantity.current.value)
  }
  setProductData([...productdata,newproduct])
      setflag(false)
  }
  const submit = (event) =>{
    event.preventDefault()
    let token = localStorage.getItem('_token');
    let decode = jwt_decode(token);

    let newData={
      email:decode.email,
      remail:remail.current.value,
      rname:rname.current.value,
      add:add.current.value,
      date: date.current.value,
      product: productdata,
      status:"UNPAID"
    }
    addinvoice(newData).then(res=>console.log(res.data))
    console.log(newData);
    // setProductData([...productdata,newData])
    alert("Data Added")

  }
  return (
    <>
      <Nav />
      <div className='container'>
        <h3 className='mt-3'>Add Invoice</h3>
        <div classname="container ">
          <form>
            <div className='mt-5 border p-5'>
              <div class="form-row ml-5">
                <div class="col">
                  <input type="text" name='rname'  ref={rname} class="form-control w-75" placeholder="Receiver name" />
                </div>
                <div class="col">
                  <input type="text" name='add' ref={add} class="form-control w-75" placeholder="Receiver address" />
                </div>
                </div>
                <div class="form-row mt-4 ml-5">
                <div class="col">
                  <input type="email" name='remail' ref={remail} class="form-control w-75" placeholder="Receiver Email" />
                </div>
                <div class="col">
                  <input type="date" name='date' ref={date} class="form-control w-75" />
                </div>
              </div>
              <div className='mt-5'>
                <table className='table mt-3'> 
                <thead className='bg-warning'>
                   <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Total</th>
                   </tr>
               </thead>

               <tbody>
                 {productdata.map((data,index)=>
                   <tr key={index}>
                       <td>{data.title}</td>
                       <td>{data.quantity}</td>
                       <td>{data.price}</td>
                       <td>{data.discount}</td>
                       <td>{data.total}</td>
                   </tr>
                   )}
               </tbody>
        
                </table>
              </div>
              {flag ? <div>
              <div class="form-row">
                <div class="col">
                  <input type="text" ref={title} name='title' class="form-control" placeholder="Item name" />
                </div>
                <div class="col">
                  <input type="number" ref={quantity} name='quantity' class="form-control" placeholder="Quntity" />
                </div>
                
                <div class="col">
                  <input type="number" ref={price} name='price' class="form-control" placeholder="Price" />
                </div> <div class="col">
                  <input type="number" ref={discount} name='discount' class="form-control" placeholder="Discount" />
                </div>
               
              </div> 
                
            
              <div className='text-center mt-3'>
            <button onClick={()=> submitproduct()} className='btn btn-info' >Submit Product</button>
            </div>  </div>
           : <div className='text-center mt-3'>
            <button onClick={()=> setflag(true)} className='btn btn-danger rounded-circle' >+
            </button>
            </div>}
                  <button onClick={submit} className='btn btn-success mt-5'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddInvoice
