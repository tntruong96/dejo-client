import axios from 'axios'



export const caxios = axios.create({
    url: process.env.URL_API,
    timeout: 1000,
    headers: {
        // Authorization: 'Bearer',\
        "Content-Type": 'application/json'
    },
    // withCredentials: true
})