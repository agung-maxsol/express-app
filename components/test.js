const express = require('express')
const mysql = require('../services/mysql')
const { check, validationResult } = require('express-validator/check')
const router = express.Router()

const validateRequest = [
  check('username', 'The email is not a valid address').isEmail().normalizeEmail().trim().escape(),
  check('password', 'The password must be 5+ characters long').isLength({ min: 5 })
]

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

    res.json({
      status: true,
      message: 'Hello world from /test/user!',
      data: data,
      dataExtended: rows
    })
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

router.post('/post', validateRequest, (req, res, next) => {
  let errors = validationResult(req)
  let output = {
    status: true,
    message: 'Hello world from /test/post!',
    body: req.body
  }

  if (!errors.isEmpty()) {
    output.body = undefined
    output.errors = errors.array()
  }

  res.json(output)
})

module.exports = router
