'use strict'
const line = require('@line/bot-sdk')
const crypto = require('crypto')
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN })

const flex_message = {
	'type': 'flex',
	'altText': '#',
	'contents': {
		'type': 'carousel',
		'contents': [
			{
				'type': 'bubble',
				'hero': {
					'type': 'image',
					'size': 'full',
					'aspectRatio': '173:231',
					'aspectMode': 'cover',
					'url':
						'https://www.daikyo-anabuki.co.jp/image/o/buy/madori/MHF37390.jpg',
				},
				'body': {
					'type': 'box',
					'layout': 'vertical',
					'spacing': 'sm',
					'contents': [
						{
							'type': 'text',
							'text': '「塚交差点」下車徒歩1分',
							'wrap': true,
							'weight': 'bold',
							'size': 'xl',
						},
						{
							'type': 'box',
							'layout': 'baseline',
							'contents': [
								{
									'type': 'text',
									'text': '1,280',
									'wrap': true,
									'weight': 'bold',
									'size': 'xl',
									'flex': 0,
								},
								{
									'type': 'text',
									'text': '万円',
									'wrap': true,
									'weight': 'bold',
									'size': 'sm',
									'flex': 0,
								},
							],
						},
						{
							'type': 'text',
							'text': '/19.39㎡/',
							'wrap': true,
							'size': 'xs',
							'margin': 'md',
							'flex': 0,
						},
					],
				},
				'footer': {
					'type': 'box',
					'layout': 'vertical',
					'spacing': 'sm',
					'contents': [
						{
							'type': 'button',
							'style': 'primary',
							'action': {
								'type': 'uri',
								'label': 'action',
								'uri': 'http://linecorp.com/',
							},
						},
						{
							'type': 'button',
							'action': {
								'type': 'postback',
								'label': '内見を予約する',
								'data': 'action=detail&articleId=100',
							},
						},
					],
				},
			},
			{
				'type': 'bubble',
				'hero': {
					'type': 'image',
					'size': 'full',
					'aspectRatio': '173:231',
					'aspectMode': 'cover',
					'url':
						'https://www.daikyo-anabuki.co.jp/image/o/buy/madori/MHF37758.jpg',
				},
				'body': {
					'type': 'box',
					'layout': 'vertical',
					'spacing': 'sm',
					'contents': [
						{
							'type': 'text',
							'text': '「渋谷」駅徒歩8分',
							'wrap': true,
							'weight': 'bold',
							'size': 'xl',
						},
						{
							'type': 'box',
							'layout': 'baseline',
							'flex': 1,
							'contents': [
								{
									'type': 'text',
									'text': '12,000',
									'wrap': true,
									'weight': 'bold',
									'size': 'xl',
									'flex': 0,
								},
								{
									'type': 'text',
									'text': '万円',
									'wrap': true,
									'weight': 'bold',
									'size': 'sm',
									'flex': 0,
								},
							],
						},
						{
							'type': 'text',
							'text': '1LDK/56.66㎡/',
							'wrap': true,
							'size': 'xs',
							'margin': 'md',
							'flex': 0,
						},
					],
				},
				'footer': {
					'type': 'box',
					'layout': 'vertical',
					'spacing': 'sm',
					'contents': [
						{
							'type': 'button',
							'flex': 2,
							'style': 'primary',
							'action': {
								'type': 'uri',
								'label': '詳細を見る',
								'uri': 'https://www.prime-x.co.jp/',
							},
						},
						{
							'type': 'button',
							'action': {
								'type': 'uri',
								'label': '内見を予約する',
								'uri': 'https://www.prime-x.co.jp/',
							},
						},
					],
				},
			},
			{
				'type': 'bubble',
				'body': {
					'type': 'box',
					'layout': 'vertical',
					'spacing': 'sm',
					'contents': [
						{
							'type': 'button',
							'flex': 1,
							'gravity': 'center',
							'action': {
								'type': 'uri',
								'label': 'See more',
								'uri': 'https://www.prime-x.co.jp/',
							},
						},
					],
				},
			},
		],
	},
}

exports.handler = function (event, context) {
	console.log(event)

	let signature = crypto
		.createHmac('sha256', process.env.CHANNELSECRET)
		.update(event.body)
		.digest('base64')
	// 管理画面からだとヘッダーが違う
	let checkHeader = (event.headers || {})['X-Line-Signature']
	if (!checkHeader) checkHeader = event.headers['x-line-signature']
	let body = JSON.parse(event.body)

	if (signature === checkHeader) {
		if (!body.events.length) {
			// 管理画面からの接続確認
			let lambdaResponse = {
				statusCode: 200,
				headers: { 'X-Line-Status': 'OK' },
				body: '{"result":"connect check"}',
			}
			context.succeed(lambdaResponse)
		} else {
			let text = body.events[0].message.text
			if (text === '物件') {
				console.log('物件を入力')
				client
					.replyMessage(body.events[0].replyToken, flex_message)
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
		}
	} else {
		console.log('署名認証エラー')
	}
}
