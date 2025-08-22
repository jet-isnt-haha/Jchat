//应用功能配置
export const appConfig = {
	session: {
		titleMaxLength: 20,
		titleSuffix: '...',
		defaultTitle: '新对话',
		autoTitle: true
	},

	search: {
		debounceDelay: 400,
		minSearchLength: 1
	},
	canvas: {
		width: '375.20',
		height: '677.20',
		ecmaVersion: 'lastest' as const
	},
	touch: {
		longPressDelay: 500,
		moveThreshold: 10,
		scrollTolerance: 60
	},
	virtualization: {
		estimatedItemSize: 50,
		overscan: 5
	},
	user: {
		defaultName: 'jet chen'
	},
	routes: {
		home: '/session',
		sessionWithId: '/session/:id',
		history: '/history',
		canvas: '/canvas',
		sessionNew: '/session/new'
	},
	chatMode: {
		normal: 'normal',
		temp: 'temp'
	}
} as const;
