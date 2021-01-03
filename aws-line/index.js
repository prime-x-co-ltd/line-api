'use strict'
const line = require('@line/bot-sdk')
const crypto = require('crypto')
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN })

const datafeed = require('./datafeed')
const messenger = require('./template')

exports.handler = function (event, context) {
	console.log(event)

	let signature = crypto
		.createHmac('sha256', process.env.CHANNELSECRET)
		.update(event.body)
		.digest('base64')
	// 管理画面からだとヘッダーが違う
	let checkHeader = (event.headers || {})['X-Line-Signature']
	if (!checkHeader) checkHeader = event.headers['x-line-signature']

	// 署名認証エラー
	if (signature !== checkHeader) {
		console.log('ERROR: Signature-Authentication')
		let lambdaResponse = {
			statusCode: 200,
			headers: { 'X-Line-Status': 'NG' },
			body: '{"result":"auth-error"}',
		}
		context.succeed(lambdaResponse)
	}
	// リクエストボディ取得
	let body = JSON.parse(event.body)

	// 管理画面からの接続確認
	if (!body.events.length) {
		let lambdaResponse = {
			statusCode: 200,
			headers: { 'X-Line-Status': 'OK' },
			body: '{"result":"connect check"}',
		}
		context.succeed(lambdaResponse)
	}

	// イベントタイプごとの処理
	switch (body.events[0].type) {
		case 'message':
			let text = body.events[0].message.text
			if (text === '物件') {
				client
					.replyMessage(
						body.events[0].replyToken,
						messenger(datafeed.preview)
					)
					.then((response) => {
						let lambdaResponse = {
							statusCode: 200,
							headers: { 'X-Line-Status': 'OK' },
							body: '{"result":"completed"}',
						}
						context.succeed(lambdaResponse)
					})
					.catch((err) => console.log(err))
			} else {
				const message = {
					type: 'text',
					text: text,
				}
				client
					.replyMessage(body.events[0].replyToken, message)
					.then((response) => {
						let lambdaResponse = {
							statusCode: 200,
							headers: { 'X-Line-Status': 'OK' },
							body: '{"result":"completed"}',
						}
						context.succeed(lambdaResponse)
					})
					.catch((err) => console.log(err))
			}
			break
		case 'postback':
			console.log(body.events[0].postback.data)
			switch (body.events[0].postback.data) {
				case 'confirm':
					const confirm = {
						'type': 'template',
						'altText': 'this is a confirm template',
						'template': {
							'type': 'confirm',
							'text': '内見を予約しますか？',
							'actions': [
								{
									'type': 'message',
									'label': 'ぜひ！',
									'text': 'yes',
								},
								{
									'type': 'message',
									'label': 'やっぱやめた',
									'text': 'no',
								},
							],
						},
					}
					client
						.replyMessage(body.events[0].replyToken, confirm)
						.then((response) => {
							let lambdaResponse = {
								statusCode: 200,
								headers: { 'X-Line-Status': 'OK' },
								body: '{"result":"completed"}',
							}
							context.succeed(lambdaResponse)
						})
						.catch((err) => console.log(err))
				case 'shibuya-ku':
				case 'minato-ku':
				case 'meguro-ku':
					client
						.replyMessage(
							body.events[0].replyToken,
							messenger(datafeed[body.events[0].postback.data])
						)
						.then((response) => {
							let lambdaResponse = {
								statusCode: 200,
								headers: { 'X-Line-Status': 'OK' },
								body: '{"result":"completed"}',
							}
							context.succeed(lambdaResponse)
						})
						.catch((err) => console.log(err))
					break
			}
			break
	}
}
