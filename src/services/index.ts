//create service api using axios
import axios from 'axios'

const service = axios.create({
    baseURL: 'http:///192.168.2.102:3000/',
})

export default service
