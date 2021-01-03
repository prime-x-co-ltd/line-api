/**
 * データフィードを受け取ってJSONオブジェクトを返す
 */
module.exports = (datafeed) => {
	const contents = datafeed.map((data) => {
		return {
			'type': 'bubble',
			'hero': {
				'type': 'image',
				'size': 'full',
				'aspectRatio': '173:231',
				'aspectMode': 'cover',
				'url': data.imageUrl,
			},
			'body': {
				'type': 'box',
				'layout': 'vertical',
				'spacing': 'sm',
				'contents': [
					{
						'type': 'text',
						'text': data.text,
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
								'text': data.price,
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
						'text': data.description,
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
							'label': '詳細を見る',
							'uri': data.linkUrl,
						},
					},
					{
						'type': 'button',
						'action': {
							'type': 'postback',
							'label': '内見を予約する',
							'data': 'confirm',
						},
					},
				],
			},
		}
	})
	return {
		'type': 'flex',
		'altText': '#',
		'contents': {
			'type': 'carousel',
			'contents': contents,
		},
	}
}

// module.exports = {
// 	confirm: {
// 		'type': 'template',
// 		'altText': 'this is a confirm template',
// 		'template': {
// 			'type': 'confirm',
// 			'text': '内見を予約しますか？',
// 			'actions': [
// 				{
// 					'type': 'message',
// 					'label': 'ぜひ！',
// 					'text': 'yes',
// 				},
// 				{
// 					'type': 'message',
// 					'label': 'やっぱやめた',
// 					'text': 'no',
// 				},
// 			],
// 		},
// 	},
// 	'shibuya-ku': {
// 		'type': 'flex',
// 		'altText': '#',
// 		'contents': {
// 			'type': 'carousel',
// 			'contents': [
// 				{
// 					'type': 'bubble',
// 					'hero': {
// 						'type': 'image',
// 						'size': 'full',
// 						'aspectRatio': '173:231',
// 						'aspectMode': 'cover',
// 						'url':
// 							'https://www.daikyo-anabuki.co.jp/image/o/buy/madori/MHF37651.jpg',
// 					},
// 					'body': {
// 						'type': 'box',
// 						'layout': 'vertical',
// 						'spacing': 'sm',
// 						'contents': [
// 							{
// 								'type': 'text',
// 								'text': '「恵比寿」駅徒歩7分',
// 								'wrap': true,
// 								'weight': 'bold',
// 								'size': 'xl',
// 							},
// 							{
// 								'type': 'box',
// 								'layout': 'baseline',
// 								'contents': [
// 									{
// 										'type': 'text',
// 										'text': '9,080',
// 										'wrap': true,
// 										'weight': 'bold',
// 										'size': 'xl',
// 										'flex': 0,
// 									},
// 									{
// 										'type': 'text',
// 										'text': '万円',
// 										'wrap': true,
// 										'weight': 'bold',
// 										'size': 'sm',
// 										'flex': 0,
// 									},
// 								],
// 							},
// 							{
// 								'type': 'text',
// 								'text': '1LDK/49.11㎡/',
// 								'wrap': true,
// 								'size': 'xs',
// 								'margin': 'md',
// 								'flex': 0,
// 							},
// 						],
// 					},
// 					'footer': {
// 						'type': 'box',
// 						'layout': 'vertical',
// 						'spacing': 'sm',
// 						'contents': [
// 							{
// 								'type': 'button',
// 								'style': 'primary',
// 								'action': {
// 									'type': 'uri',
// 									'label': '詳細を見る',
// 									'uri':
// 										'https://www.daikyo-anabuki.co.jp/buy/detail/MHF37651/?utm_source=criteo&utm_medium=banner&utm_campaign=retargeting&utm_term=buy&argument=jHMKTWvJ&dmai=a5f77ec2a9a570',
// 								},
// 							},
// 							{
// 								'type': 'button',
// 								'action': {
// 									'type': 'postback',
// 									'label': '内見を予約する',
// 									'data': 'confirm',
// 								},
// 							},
// 						],
// 					},
// 				},
// 				{
// 					'type': 'bubble',
// 					'hero': {
// 						'type': 'image',
// 						'size': 'full',
// 						'aspectRatio': '173:231',
// 						'aspectMode': 'cover',
// 						'url':
// 							'https://www.daikyo-anabuki.co.jp/image/o/buy/madori/MHF37334.jpg',
// 					},
// 					'body': {
// 						'type': 'box',
// 						'layout': 'vertical',
// 						'spacing': 'sm',
// 						'contents': [
// 							{
// 								'type': 'text',
// 								'text': '「表参道」駅徒歩11分',
// 								'wrap': true,
// 								'weight': 'bold',
// 								'size': 'xl',
// 							},
// 							{
// 								'type': 'box',
// 								'layout': 'baseline',
// 								'flex': 1,
// 								'contents': [
// 									{
// 										'type': 'text',
// 										'text': '5,200',
// 										'wrap': true,
// 										'weight': 'bold',
// 										'size': 'xl',
// 										'flex': 0,
// 									},
// 									{
// 										'type': 'text',
// 										'text': '万円',
// 										'wrap': true,
// 										'weight': 'bold',
// 										'size': 'sm',
// 										'flex': 0,
// 									},
// 								],
// 							},
// 							{
// 								'type': 'text',
// 								'text': '1LDK/39.89㎡/',
// 								'wrap': true,
// 								'size': 'xs',
// 								'margin': 'md',
// 								'flex': 0,
// 							},
// 						],
// 					},
// 					'footer': {
// 						'type': 'box',
// 						'layout': 'vertical',
// 						'spacing': 'sm',
// 						'contents': [
// 							{
// 								'type': 'button',
// 								'flex': 2,
// 								'style': 'primary',
// 								'action': {
// 									'type': 'uri',
// 									'label': '詳細を見る',
// 									'uri':
// 										'https://www.daikyo-anabuki.co.jp/buy/detail/MHF37758/?utm_source=criteo&utm_medium=banner&utm_campaign=retargeting&utm_term=buy&argument=jHMKTWvJ&dmai=a5f77ec2a9a570',
// 								},
// 							},
// 							{
// 								'type': 'button',
// 								'action': {
// 									'type': 'postback',
// 									'label': '内見を予約する',
// 									'data': 'confirm',
// 								},
// 							},
// 						],
// 					},
// 				},
// 			],
// 		},
// 	},
// 	'minato-ku': {},
// 	'meguro-ku': {},
// 	preview: {
// 		'type': 'flex',
// 		'altText': '#',
// 		'contents': {
// 			'type': 'carousel',
// 			'contents': [
// 				{
// 					'type': 'bubble',
// 					'hero': {
// 						'type': 'image',
// 						'size': 'full',
// 						'aspectRatio': '173:231',
// 						'aspectMode': 'cover',
// 						'url':
// 							'https://www.daikyo-anabuki.co.jp/image/o/buy/madori/MHF37390.jpg',
// 					},
// 					'body': {
// 						'type': 'box',
// 						'layout': 'vertical',
// 						'spacing': 'sm',
// 						'contents': [
// 							{
// 								'type': 'text',
// 								'text': '「塚交差点」下車徒歩1分',
// 								'wrap': true,
// 								'weight': 'bold',
// 								'size': 'xl',
// 							},
// 							{
// 								'type': 'box',
// 								'layout': 'baseline',
// 								'contents': [
// 									{
// 										'type': 'text',
// 										'text': '1,280',
// 										'wrap': true,
// 										'weight': 'bold',
// 										'size': 'xl',
// 										'flex': 0,
// 									},
// 									{
// 										'type': 'text',
// 										'text': '万円',
// 										'wrap': true,
// 										'weight': 'bold',
// 										'size': 'sm',
// 										'flex': 0,
// 									},
// 								],
// 							},
// 							{
// 								'type': 'text',
// 								'text': '/19.39㎡/',
// 								'wrap': true,
// 								'size': 'xs',
// 								'margin': 'md',
// 								'flex': 0,
// 							},
// 						],
// 					},
// 					'footer': {
// 						'type': 'box',
// 						'layout': 'vertical',
// 						'spacing': 'sm',
// 						'contents': [
// 							{
// 								'type': 'button',
// 								'style': 'primary',
// 								'action': {
// 									'type': 'uri',
// 									'label': '詳細を見る',
// 									'uri':
// 										'https://www.daikyo-anabuki.co.jp/buy/detail/MHF37390/?utm_source=criteo&utm_medium=banner&utm_campaign=retargeting&utm_term=buy&argument=jHMKTWvJ&dmai=a5f77ec2a9a570',
// 								},
// 							},
// 							{
// 								'type': 'button',
// 								'action': {
// 									'type': 'postback',
// 									'label': '内見を予約する',
// 									'data': 'confirm',
// 								},
// 							},
// 						],
// 					},
// 				},
// 				{
// 					'type': 'bubble',
// 					'hero': {
// 						'type': 'image',
// 						'size': 'full',
// 						'aspectRatio': '173:231',
// 						'aspectMode': 'cover',
// 						'url':
// 							'https://www.daikyo-anabuki.co.jp/image/o/buy/madori/MHF37758.jpg',
// 					},
// 					'body': {
// 						'type': 'box',
// 						'layout': 'vertical',
// 						'spacing': 'sm',
// 						'contents': [
// 							{
// 								'type': 'text',
// 								'text': '「渋谷」駅徒歩8分',
// 								'wrap': true,
// 								'weight': 'bold',
// 								'size': 'xl',
// 							},
// 							{
// 								'type': 'box',
// 								'layout': 'baseline',
// 								'flex': 1,
// 								'contents': [
// 									{
// 										'type': 'text',
// 										'text': '12,000',
// 										'wrap': true,
// 										'weight': 'bold',
// 										'size': 'xl',
// 										'flex': 0,
// 									},
// 									{
// 										'type': 'text',
// 										'text': '万円',
// 										'wrap': true,
// 										'weight': 'bold',
// 										'size': 'sm',
// 										'flex': 0,
// 									},
// 								],
// 							},
// 							{
// 								'type': 'text',
// 								'text': '1LDK/56.66㎡/',
// 								'wrap': true,
// 								'size': 'xs',
// 								'margin': 'md',
// 								'flex': 0,
// 							},
// 						],
// 					},
// 					'footer': {
// 						'type': 'box',
// 						'layout': 'vertical',
// 						'spacing': 'sm',
// 						'contents': [
// 							{
// 								'type': 'button',
// 								'flex': 2,
// 								'style': 'primary',
// 								'action': {
// 									'type': 'uri',
// 									'label': '詳細を見る',
// 									'uri':
// 										'https://www.daikyo-anabuki.co.jp/buy/detail/MHF37758/?utm_source=criteo&utm_medium=banner&utm_campaign=retargeting&utm_term=buy&argument=jHMKTWvJ&dmai=a5f77ec2a9a570',
// 								},
// 							},
// 							{
// 								'type': 'button',
// 								'action': {
// 									'type': 'postback',
// 									'label': '内見を予約する',
// 									'data': 'confirm',
// 								},
// 							},
// 						],
// 					},
// 				},
// 				{
// 					'type': 'bubble',
// 					'body': {
// 						'type': 'box',
// 						'layout': 'vertical',
// 						'spacing': 'sm',
// 						'contents': [
// 							{
// 								'type': 'button',
// 								'flex': 1,
// 								'gravity': 'center',
// 								'action': {
// 									'type': 'uri',
// 									'label': 'See more',
// 									'uri': 'https://www.prime-x.co.jp/',
// 								},
// 							},
// 						],
// 					},
// 				},
// 			],
// 		},
// 	},
// }
