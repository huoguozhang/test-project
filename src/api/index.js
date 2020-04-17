import Axios from 'axios'
const request = Axios.create({
  baseURL: '/api'
})

request.interceptors.response.use(response => {
  if (response.data.code === 0) {
    return response.data.data
  }
})
const requestList = {
  getStudentList (params) {
    return request.get('/student/', {
      params
    })
  },
  createStudentItem (data) {
    return request.post('/student/', data)
  },
  updateStudentItem (uid, data) {
    return request.put(`/student/${uid}/`, data)
  },
  deleteStudentList (data) {
    return request.delete('/student/', { data })
  },
  getSectionList () {
    return request.get('/section/')
  }
}

export default requestList
