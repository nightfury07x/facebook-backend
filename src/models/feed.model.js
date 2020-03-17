/* eslint-disable indent */
'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedSchema = new Schema({
    time: String,
    item: String,
    verb: String,
    sender_id: String,
    fb_page_id: String,
    fb_post_id: String,
    message: String,
    comment_id: String,
    parent_id: String,
    sender_fb_name: String,
    sender_fb_id: String,
    mobile_no: [{
        type: String
    }]
}, {
        timestamps: true
    })

module.exports = mongoose.model('Feed', FeedSchema)
