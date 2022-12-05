//create service api using axios
import axios from 'axios'
const service = axios.create({
    baseURL:  import.meta.env.VITE_BACKEND_URL || 'https://pokedex-italo.up.railway.app',
})

export default service
