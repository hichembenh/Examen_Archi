import axios from 'axios'

const CustomerAPI = axios.create({
    baseUrl: 'http://localhost:8082/api'
})
const BookAPI = axios.create({
    baseUrl: 'http://localhost:9500'
})
const BillingAPI = axios.create({
    baseUrl: 'http://localhost:8083/api'
})

export const getCustomer = () => CustomerAPI.get('/customers')
export const addCustomer = (customer) => CustomerAPI.post('/customers',customer)

export const getBooks = () => BookAPI.get('/books')
export const addBook = (book) => BookAPI.post('/books',book)

export const getBillings = () => BillingAPI.get('/invoices')
export const addBilling = (billing) => BillingAPI.post('/invoices',billing)

