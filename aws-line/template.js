/**
 * データフィードを受け取ってJSONオブジェクトを返す
 */
module.exports = {
	overview: (datafeed) => {
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
	},
	search: (items) => {
		const contents = items.map((item) => {
			return {
				'type': 'bubble',
				'size': 'micro',
				'body': {
					'type': 'box',
					'layout': 'vertical',
					'contents': [
						{
							'type': 'spacer',
							'size': 'xxl',
						},
						{
							'type': 'text',
							'text': item.value,
							'size': 'xxl',
							'weight': 'bold',
							'align': 'center',
							'color': '#ffffff',
						},
						{
							'type': 'spacer',
							'size': 'xxl',
						},
					],
					'backgroundColor': '#00b900',
					'action': {
						'type': 'postback',
						'label': 'action',
						'data': item.key,
					},
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
	},
	confirm: () => {
		return {
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
	},
}
