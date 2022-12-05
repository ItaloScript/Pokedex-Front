//create service api using axios
import axios from 'axios'
const service = axios.create({
    baseURL:  'https://pokedex-italo.up.railway.app',
})

export default service
