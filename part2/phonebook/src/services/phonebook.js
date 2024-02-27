import axios from 'axios'


const url = 'http://localhost:3001/persons'

const getPhone = () => {
	const request = axios.get(url)
	return request.then(response => response.data)
}
const createPhone = (newPhoneObject) => {
	const request = axios.post(url, newPhoneObject)
	return request.then(response => response.data)
}
const updatePhone = (id, newPhoneObject) => {
	const request = axios.put(`${url}/${id}`, newPhoneObject)
	return request.then(response => response.data)
}

const deletePhone = (id) => {
	const request = axios.delete(`${url}/${id}`)
	return request.then(response => response)
}
export default {getPhone, createPhone, updatePhone, deletePhone}