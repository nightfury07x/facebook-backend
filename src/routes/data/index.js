/* eslint-disable indent */
'use strict'
const express = require('express')
const router = express.Router()
const Feed = require('../../models/feed.model')

router.get('/getFeed', (req, res) => {
    Feed.find({})
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
}) // api status

module.exports = router
