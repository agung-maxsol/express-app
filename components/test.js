const express = require('express')
const mysql = require('../services/mysql')
const router = express.Router()

const getData = (res) => {
  mysql.query('SELECT * FROM test', (err, rows) => {
    if (err) {
      throw err
    }

    getDataExtended(res, rows)
  })
}

const getDataExtended = (res, data) => {
  mysql.query('SELECT * FROM test', (err, rows) => {
    if (err) {
      throw err
    }

    processData(res, data, rows)
  })
}

const processData = (res, data, dataExtended) => {
  res.json({
    status: true,
    message: 'Hello world from /test/user!',
    data: data,
    dataExtended: dataExtended
  })
}

router.get('/user', (req, res, next) => {
  getData(res)
})

module.exports = router
