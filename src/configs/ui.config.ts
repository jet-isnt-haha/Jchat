// UI界面配置
export const uiConfig = {
	colors: {
		// 从你的代码中提取的颜色值
		primary: '#6D4FC2', // chat-header背景色
		primaryLight: '#f6f2ff', // bot消息背景色
		secondary: '#6d4fc2', // SessionModal背景色
		background: '#f5f5f5', // home页面背景色
		historyBackground: '#f9f9f9', // history页面背景色
		white: '#ffffff',
		scrollThumb: '#ddd3f9',
		borderLight: '#CCCCE5', // chat-form边框色
		borderGray: '#eee',
		textGray: '#666',
		textDark: '#888'
	},
	layout: {
		// 从你的CSS中提取的布局尺寸
		headerPadding: '15px 22px', // chat-header padding
		bodyPadding: '25px 22px', // chat-body padding
		footerPadding: '15px 22px 20px', // chat-footer padding
		bodyHeight: '700px', // chat-body height
		bodyGap: '20px', // gap-5 = 20px
		messageGap: '11px', // gap-[11px]
		messagePadding: '12px 16px', // p-[12px_16px]
		formHeight: '47px', // h-[47px]
		inputPadding: '17px', // px-[17px]
		buttonSize: '34px', // h-8.5 w-8.5 (8.5 * 4 = 34px)
		buttonMargin: '6px', // mr-1.5 = 6px
		maxMessageWidth: '75%' // max-w-[75%]
	},
	borderRadius: {
		form: '32px', // rounded-[32px]
		botMessage: '13px 13px 13px 3px', // bot消息圆角
		userMessage: '13px 13px 3px 13px' // user消息圆角
	},
	animation: {
		transitionDuration: '200ms', // duration-200
		loadingRotation: 'loading-rotate',
		searchSpin: 'custom-spin'
	}
} as const;
