//文本内容配置

export const contentConfig = {
	// 用户界面文本
	ui: {
		placeholders: {
			messageInput: 'message...',
			searchInput: 'Search Grok History'
		},
		buttons: {
			confirm: '确认',
			cancel: '取消',
			delete: '删除'
		},
		messages: {
			thinking: 'Thinking...',
			emptyChat: '请输入你的问题',
			noResults: '未找到结果',
			loading: '加载中...'
		},
		icons: {
			send: 'arrow_upward',
			stop: 'crop_square',
			sort: 'sort',
			edit: 'edit_square',
			search: 'search',
			back: 'chevron_right'
		},
		role: {
			user: 'user',
			model: 'model',
			system: 'system'
		}
	},
	modals: {
		confirmDelete: {
			title: '删除会话',
			message: '确定要删除这个会话吗？删除后将无法恢复，所有对话记录都将丢失。',
			confirmText: '删除',
			cancelText: '取消'
		},
		sessionActions: {
			options: [
				{ icon: '✏️', label: '重命名', action: 'edit', danger: false },
				{ icon: '📋', label: '置顶', action: 'pin', danger: false },
				{ icon: '🗑️', label: '删除', action: 'delete', danger: true }
			]
		}
	},
	system: {
		errors: {
			requestCanceled: '请求被用户取消',
			requestError: '请求发生错误',
			networkError: '网络连接失败',
			unknownError: '未知错误'
		},
		success: {
			sessionDeleted: '会话已删除',
			settingsSaved: '设置已保存'
		}
	}
} as const;
