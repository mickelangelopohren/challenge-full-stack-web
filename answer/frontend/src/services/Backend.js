import axios from "axios"

const baseUrl = process.env.VUE_APP_API_URL

class BackendDataService {

  getAll() {
    return axios.get(`${baseUrl}/students`)
  }

  getOne(id) {
    return axios.get(`${baseUrl}/students/${id}`)
  }

  create(data) {
    return axios.post(`${baseUrl}/students`, data)
  }

  update(id, data) {
    return axios.patch(`${baseUrl}/students/${id}`, data)
  }

  remove(id) {
    return axios.delete(`${baseUrl}/students/${id}`)
  }
}

export default new BackendDataService()
