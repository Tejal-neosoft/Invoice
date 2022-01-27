import axios from 'axios'
import { URL } from './Url'
export function getPost() {
    return axios.get(`${URL}posts/fetchuser`);
}
export function addPost(data) {
    return axios.post(`${URL}posts/adduser`, data);
}
export function validation(data) {
    return axios.post(`${URL}posts/validate`, data)
}
export function allorders() {
    return axios.get(`${URL}posts/allorders`)
}
export function addinvoice(data) {
    return axios.post(`${URL}posts/addinvoice`, data)
}
export function fetchproduct(data) {
    return axios.post(`${URL}posts/fetchproduct`, data)
}

export function deleteInvoice(id) {
    return axios.post(`${URL}posts/deleteinvoice`, id)
}

export function Updatepost(id) {
    return axios.post(`${URL}posts/updatepost`, id)
}
export function UserData(data) {
    return axios.post(`${URL}posts/updateuser`, data)
}

export function email(data,uemail,remail){
    return  axios.post(`${URL}posts/email/${uemail}/${remail}`,data,{
        headers:{

            'Content-Type':"multipart/form-data"
        }
    }) 
}


// import {MAIN_URL} from './Url'


// export function addPosts(data){
//     return axios.post(`${MAIN_URL}posts/addpost`,data)
// }
// export function addInvoice(data){
//     return axios.post(`${MAIN_URL}posts/addinvoice`,data)
// }

// export function getPosts(){
//     return axios.get(`${MAIN_URL}posts/getpost`)
// }
// export function validation(data){
//     return axios.post(`${MAIN_URL}posts/validate`,data)
// }
// export function fetchproduct(data){
//     return axios.post(`${MAIN_URL}posts/fetchproduct`,data)
// }

// export function deleteInvoice(id){
//     return axios.post(`${MAIN_URL}posts/deleteinvoice`,id)
// }

// export function Updatepost(id){
//     return axios.post(`${MAIN_URL}posts/updatepost`,id)
// }