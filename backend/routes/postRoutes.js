import userSchema from '../db/userSchema.js'
import productSchema from '../db/productSchema.js';
import express from 'express'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import multer from 'multer'

const jwtSecret = "asd889asdas5656asdas887";
const router = express.Router()
const storage=multer.memoryStorage();
var upload =multer({storage:storage});
router.post('/fetchproduct',(req,res)=>{
        productSchema.find({}, (err, data) => {
            if (err) throw err;
            else {
                res.send(data)
            }
        })
})
router.post('/adduser',(req,res)=>{
    let ins = new userSchema({name:req.body.name,firmname:req.body.firmname,email:req.body.email,pass:req.body.pass,username:req.body.username,cpass:req.body.cpass,mob:req.body.mob})
    console.log(req.body);
    ins.save((e)=>{
        if(e){
        res.send("Already added")
        console.log(e);}
       else {
           res.send("New data Added");
        }
    })

})


router.post("/validate", (req, res) => {
    let email=req.body.email;
    let pass=req.body.pass;
    userSchema.findOne({email:email,pass:pass},(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else if(data==null)
        {
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else {
            let payload={
                id:data._id,
                email:email,mob:data.mob,firmname:data.firmname,name:data.name
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,"msg":"Login Success","token":token})
        }
    })
})
router.post('/addinvoice',(req,res)=>{
    console.log(req.body);
    let ins = new productSchema({
        rname:req.body.rname,
        add:req.body.add,
        date:req.body.date,
        remail:req.body.remail,
        product:req.body.product,
        email:req.body.email,
        status:req.body.status})
    console.log(ins);

    ins.save((e)=>{
        if(e){
        res.send("Already added")
        console.log(e);}
       else {
           res.send("New data Added");
        }
    })
    
})
router.post("/deleteinvoice",(req,res)=>{
    console.log(req.body, "In post routes")
    productSchema.deleteOne({_id:req.body._id},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})

router.post("/updatepost",(req,res)=>{
    console.log(req.body, "In post routes")
    productSchema.updateOne({_id:req.body._id},{$set:{status:'PAID'}},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})
router.post("/updateuser",(req,res)=>{
    let email= req.body.email
    console.log(req.body, "in update")
    userSchema.updateOne({_id:req.body.id},{$set:{name:req.body.name, mob:req.body.mob, email:req.body.email,firmname:req.body.firmname }},(err,data)=>{
        if(err) throw err;
        else {
            console.log(data,"in line 102")
        }
    })
    userSchema.findOne({_id:req.body.id},(err,data)=>{
        if(err) throw err;
        else {
            console.log(data,"in line 108")
            let payload={
                id:data._id,
                email:data.email,name:data.name, mob:data.mob, firmname:data.firmname
            }
            console.log(payload,"payload")
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,"msg":"Login Success","token":token})
        }
    })

})
router.post('/email/:uemail/:remail', upload.single('file'), (req, res) => {
    
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tejal123supe@gmail.com',
            pass: '02512602072'
      }
    });

    let mailOptions = {
      
        from: req.params.uemail,
        to: req.params.remail,
        subject: 'Invoice PDF',
        text:

            `Dear Customer,

       Your Have Successfully downloaded the pdf and We have attached the pdf here. Please find Attached PDF.
       
       Thank You!`,
        attachments: [{
            filename: 'invoice.pdf',
            content: req.file.buffer,
        }],

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send("Email Sent!")
})
// router.post('/email',upload.single('file') , (req,res)=>{
 
//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       tls: {
//         rejectUnauthorized: false
//     },
//       auth: {
//         user: "tejal123supe@gmail.com",
//         pass: "02512602072"
//       }
//     });

//     var mailOptions = {
//       from: 'tejal123supe@gmail.com',
//       to: 'supetejalc@gmail.com',
//       subject: 'Invoice PDF',
//       text:
       
//       ` Dear Customer,

//        Your Have Successfully downloaded the pdf and We have attached the pdf here. Please find Attached PDF.
       
//        Thank You!`,
//        attachments: [{
//         filename: 'invoice.pdf',
//         content: req.file.buffer,
//       }],

//     };

//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//     res.send("Email Sent!")
//   })
export default router