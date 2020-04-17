const uuid = require('uuid')
let num = 1
const sectionList = [
  {
    uid: uuid(),
    name: '一班'

  },
  {
    uid: uuid(),
    name: '二班'
  },
  {
    uid: uuid(),
    name: '三班'
  },
  {
    uid: uuid(),
    name: '四班'
  }
]

const studentList = [
  {
    name: '张三',
    uid: uuid(),
    number: num++,
    sex: 'm',
    section: sectionList[0]
  },
  {
    name: '李四',
    uid: uuid(),
    number: num++,
    sex: 'm',
    section: sectionList[1]
  },
  {
    name: '王五',
    uid: uuid(),
    number: num++,
    sex: 'f',
    section: sectionList[2]
  },
  {
    name: '赵六',
    uid: uuid(),
    number: num++,
    sex: 'f',
    section: sectionList[3]
  }
]

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      console.log('i get you')
      return h.file('./server/public/index.html');
    }
  },
  {
    path: '/api/student/',
    method: 'get',
    handler (request, h) {
      const reg = new RegExp(request.query.search)
      return h.response({
        code: 0,
        message: '成功',
        data: studentList.filter(v => {
          return reg.test(v.name) || reg.test(v.section.name) || reg.test(v.number)
        })
      })
    }
  },
  {
    path: '/api/student/',
    method: 'post',
    handler (request, h) {
      const { payload } = request
      let data = {
        ...payload,
        section: sectionList.find(v => v.uid === payload.section_uid),
        uid: uuid()
      }
      studentList.push(data)
      return h.response({
        code: 0,
        message: '成功',
        data
      })
    }
  },
  {
    path: '/api/student/',
    method: 'delete',
    handler (request, h) {
      const { uids } = request.payload
      let count = 0
      uids.forEach(uid => {
        let index = studentList.findIndex(s => s.uid === uid)
        if (index > -1) {
          studentList.splice(index, 1)
          count: count++
        }
      })
      return h.response({
        code: 0,
        message: '成功',
        data: {
          deleteRows: count
        }
      })
    }
  },
  {
    path: '/api/student/{uid}/',
    method: 'put',
    handler (request, h) {
      const { payload } = request
      let res = studentList.find(s => s.uid === request.params.uid)
      if (res) {
        for (let key in payload) {
          if (key in res) {
            res[key] = payload[key]
          }
        }
        res.section = sectionList.find(v => v.uid === payload.section_uid)
      }
      return h.response({
        code: 0,
        message: '成功',
        data: res
      })
    }
  },
  {
    path: '/api/section/',
    method: 'get',
    handler (request, h) {
      return h.response({
        code: 0,
        message: '成功',
        data: sectionList
      })
    }
  }
]
