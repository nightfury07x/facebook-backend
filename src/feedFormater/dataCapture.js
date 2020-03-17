/* eslint-disable brace-style */
/* eslint-disable indent */
const Feed = require('../models/feed.model')
const Message = require('../models/message.model')
const { Language, NlpManager } = require('node-nlp')
const manager = new NlpManager()

function replaceAll (str, mapObj) {
    var re = new RegExp(Object.keys(mapObj).join('|'), 'gi')
    return str.replace(re, function (matched) {
        return mapObj[matched.toLowerCase()]
    })
}

const captureData = (hookData) => {
    if (hookData.entry[0].hasOwnProperty('messaging')) {
        console.log('its message')
        const { entry } = hookData
        const messages = {
            fb_page_id: entry[0].id,
            time: entry[0].time,
            sender_fb_id: entry[0].messaging[0].sender.id,
            reciver_fb_id: entry[0].messaging[0].recipient.id,
            message: entry[0].messaging[0].message.text
        }
        mainExtractEntities(messages, 'M')
        return true
    }

    if (hookData.entry[0].changes[0].field === 'feed') {
        console.log('its feed')

        const { entry } = hookData
        const [data] = entry

        const feed = {
            time: data.time,
            item: data.changes[0].value.item,
            verb: data.changes[0].value.verb,
            sender_id: data.changes[0].value.from.id,
            fb_page_id: data.id,
            fb_post_id: data.changes[0].value.post_id,
            message: data.changes[0].value.message,
            comment_id: data.changes[0].value.comment_id,
            parent_id: data.changes[0].value.parent_id,
            sender_fb_name: data.changes[0].value.from.name,
            sender_fb_id: data.changes[0].value.from.id
        }
        // const language = new Language()
        // const guess = language.guess(feed.message)
        // console.log(guess[0])
        mainExtractEntities(feed, 'F')
        return true
    }
}

async function mainExtractEntities (msg, type) {

    var mapObj = { o: '0', i: '1' }
    console.log(replaceAll(msg.message, mapObj))
    const result = await manager.extractEntities('en', replaceAll(msg.message, mapObj))
    let payload
    if (result.entities.length > 0) {
        const data = result.entities.filter(x => x.entity === 'phonenumber')
        const phoneNo = data.map(c => c.resolution.value)
        payload = { ...msg, mobile_no: phoneNo }
        // console.log(payload)
    }
    else {
        payload = { ...msg, mobile_no: 'no_number' }
        // console.log(payload)
    }

    if (type === 'M') {
        Message.create(payload).then((res) => {
            console.log('Message instreted')
        }).catch((error) => console.log(error))
    }
    else {
        Feed.create(payload).then((res) => {
            console.log('feed instreted')
        }).catch((error) => console.log(error))
    }
}

module.exports = {
    captureData
}
