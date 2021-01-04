'use strict'
const line = require('@line/bot-sdk')
const crypto = require('crypto')
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN })

const datafeed = require('./datafeed')
const bot = require('./template')

const pref = [
	{
		key: 'tokyo',
		value: '東京都',
	},
	{
		key: 'osaka',
		value: '大阪府',
	},
	{
		key: 'aichi',
		value: '愛知県',
	},
]
const city = [
	{
		key: 'shibuya-ku',
		value: '渋谷区',
	},
	{
		key: 'minato-ku',
		value: '港区',
	},
	{
		key: 'meguro-ku',
		value: '目黒区',
	},
]

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
			if (text === '検索') {
				client
					.replyMessage(body.events[0].replyToken, bot.search(pref))
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
					client
						.replyMessage(body.events[0].replyToken, bot.confirm)
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
				case 'shibuya-ku':
				case 'minato-ku':
				case 'meguro-ku':
					client
						.replyMessage(
							body.events[0].replyToken,
							bot.overview(datafeed[body.events[0].postback.data])
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
				case 'tokyo':
					client
						.replyMessage(
							body.events[0].replyToken,
							bot.search(city)
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
				case 'osaka':
				case 'aichi':
					break
			}
			break
	}
}
