import axios from 'axios';

const URL = 'https://fakestoreapi.com/products'

export async function getProducts() {
    const response = await axios.get(URL)
    return response.data
}