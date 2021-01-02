'use strict'

const crypto = require('crypto')
const key = 'fff2a444e2f98c6f447a26e93fc4bb9e'

const body = '{"events":[],"destination":"U5466a09bc7f0d9208412c3ca774da7af"}'

let signature = crypto.createHmac('sha256', key).update(body).digest('base64')

console.log(signature)

const req = JSON.parse(body)
if (!req.events.length) console.log('Empty Array')

// {
// resource: '/',
// path: '/',
// httpMethod: 'POST',
// headers: {
//   'content-type': 'application/json; charset=utf-8',
//   Host: 'cn74jf7kmc.execute-api.ap-northeast-1.amazonaws.com',
//   'User-Agent': 'LineBotWebhook/2.0',
//   'X-Amzn-Trace-Id': 'Root=1-5feef838-72eea5775a3bd1d579fb8ca5',
//   'X-Forwarded-For': '147.92.150.194',
//   'X-Forwarded-Port': '443',
//   'X-Forwarded-Proto': 'https',
//   'x-line-signature': '4hmB9CF8p5XN53dCgEc4sT2amolof++e4/jnhShysiQ='
// },
// multiValueHeaders: {
//   'content-type': [ 'application/json; charset=utf-8' ],
//   Host: [ 'cn74jf7kmc.execute-api.ap-northeast-1.amazonaws.com' ],
//   'User-Agent': [ 'LineBotWebhook/2.0' ],
//   'X-Amzn-Trace-Id': [ 'Root=1-5feef838-72eea5775a3bd1d579fb8ca5' ],
//   'X-Forwarded-For': [ '147.92.150.194' ],
//   'X-Forwarded-Port': [ '443' ],
//   'X-Forwarded-Proto': [ 'https' ],
//   'x-line-signature': [ '4hmB9CF8p5XN53dCgEc4sT2amolof++e4/jnhShysiQ=' ]
// },
// queryStringParameters: null,
// multiValueQueryStringParameters: null,
// pathParameters: null,
// stageVariables: null,
// requestContext: {
//   resourceId: '1y206js4rb',
//   resourcePath: '/',
//   httpMethod: 'POST',
//   extendedRequestId: 'Ydu43FtvtjMFVYA=',
//   requestTime: '01/Jan/2021:10:23:52 +0000',
//   path: '/dev',
//   accountId: '882132717543',
//   protocol: 'HTTP/1.1',
//   stage: 'dev',
//   domainPrefix: 'cn74jf7kmc',
//   requestTimeEpoch: 1609496632697,
//   requestId: '1a9de652-8274-4d22-9b10-a006a84c2415',
//   identity: {
// 	cognitoIdentityPoolId: null,
// 	accountId: null,
// 	cognitoIdentityId: null,
// 	caller: null,
// 	sourceIp: '147.92.150.194',
// 	principalOrgId: null,
// 	accessKey: null,
// 	cognitoAuthenticationType: null,
// 	cognitoAuthenticationProvider: null,
// 	userArn: null,
// 	userAgent: 'LineBotWebhook/2.0',
// 	user: null
//   },
//   domainName: 'cn74jf7kmc.execute-api.ap-northeast-1.amazonaws.com',
//   apiId: 'cn74jf7kmc'
// },
// body: '{"events":[],"destination":"U5466a09bc7f0d9208412c3ca774da7af"}',
// isBase64Encoded: false
// }
