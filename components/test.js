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

const getAnotherData = async (res) => {
  let query = new Promise((resolve, reject) => {
    mysql.query('SELECT * FROM test', (err, rows) => {
      if (err) {
        throw err
      }

      console.log(2)

      resolve(rows)
    })
  })

  console.log(1)
  let data = await query
  console.log(3)

  res.json({
    status: true,
    message: 'Hello world from /test/data!',
    data: data
  })
}

router.get('/user', (req, res, next) => {
  getData(res)
})

router.get('/data', (req, res, next) => {
  getAnotherData(res)
})

module.exports = router
