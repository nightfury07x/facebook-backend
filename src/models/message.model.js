/* eslint-disable indent */
'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    time: String,
    fb_page_id: String,
    sender_fb_id: String,
    reciver_fb_id: String,
    message: String,
    mobile_no: [{
        type: String
    }]
}, {
        timestamps: true
    })

module.exports = mongoose.model('Message', MessageSchema)
