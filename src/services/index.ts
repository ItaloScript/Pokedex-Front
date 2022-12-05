//create service api using axios
import axios from 'axios'
const service = axios.create({
    baseURL:  import.meta.env.VITE_BACKEND_URL || 'http:///192.168.2.102:3000/',
})

export default service
