/* eslint-disable indent */
'use strict'
const express = require('express')
const router = express.Router()
const captureData = require('../../feedFormater/dataCapture')
const token = 'token'
// const receivedUpdates = []

router.get('/wstatus', (req, res) => { res.send({ status: 'Hook is OK' }) }) // api status

router.get(['/facebook'], function (req, res) {
    if (
        req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === token
    ) {
        res.send(req.query['hub.challenge'])
    } else {
        res.sendStatus(400)
    }
})

// router.get('/facebook', (req, res) => {
//     // Your verify token. Should be a random string.
//     let VERIFY_TOKEN = 'token'
//     // Parse the query params
//     let mode = req.query['hub.mode']
//     let token = req.query['hub.verify_token']
//     let challenge = req.query['hub.challenge']
//     // Checks if a token and mode is in the query string of the request
//     if (mode && token) {
//       // Checks the mode and token sent is correct
//       if (mode === 'subscribe' && token === VERIFY_TOKEN) {
//         // Responds with the challenge token from the request
//         console.log('WEBHOOK_VERIFIED')
//         res.status(200).send(challenge)
//       } else {
//         // Responds with '403 Forbidden' if verify tokens do not match
//         res.sendStatus(403)
//       }
//     }
//   })

router.post('/facebook', function (req, res) {
    // console.log('Facebook request body:', req.body)

    // if (!req.isXHubValid()) {
    //     console.log('Warning - request header X-Hub-Signature not present or invalid')
    //     res.sendStatus(401)
    //     return
    // }
    // console.log('request header X-Hub-Signature validated')
    captureData.captureData(req.body)
    // receivedUpdates.unshift(req.body)

    res.sendStatus(200)
})

// router.post('/facebook', (req, res) => {
//     captureData.captureData(req.body)
//     res.status(200).send('EVENT_RECEIVED')
//     // // Checks this is an event from a page subscription
//     // if (body.object === 'page')
//     //   // Iterates over each entry - there may be multiple if batched
//     //   body.entry.forEach(function(entry) {
//     //     // Gets the message. entry.messaging is an array,but
//     //     // will only ever contain one message, so we get index 0
//     //     let webhook_event = entry.messaging[0];
//     //     console.log(webhook_event);
//     //   });
//     //   // Returns a '200 OK' response to all requests
//     //   received_updates.unshift(req.body);
//     //   res.status(200).send('EVENT_RECEIVED');
//     // } else {
//     //   // Returns a '404 Not Found' if event is not from a page subscription
//     //   res.sendStatus(404);
//     // }
//   })

module.exports = router
