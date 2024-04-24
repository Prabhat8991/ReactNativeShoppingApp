import axios from 'axios';
import { getAllProducts } from './database';
import NetInfo from "@react-native-community/netinfo";

const URL = 'https://fakestoreapi.com/products'

async function getProductsFromServer() {
    const response = await axios.get(URL)
    return response.data
}


export function getProducts() {
    return new Promise((resolve, reject) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                console.log('Network connected... getting data from server')

                // Fetch data from server
                getProductsFromServer()
                    .then(data => resolve(data))
                    .catch(error => reject(error));
            } else {
                // Fetch data from SQLite
                console.log('No network... getting data from local')
                getAllProducts()
                    .then(data => resolve(data))
                    .catch(error => reject(error));
            }
        });
    });
}
