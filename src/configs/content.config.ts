//文本内容配置

import type { ConfirmConfig, ItemActions } from '@/types/chatType';

export const contentConfig = {
	// 用户界面文本
	ui: {
		placeholders: {
			messageInput: 'message...',
			searchInput: 'Search History'
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
			back: 'chevron_right',
			left_back: 'chevron_left',
			save: 'save',
			close: 'close',
			copy: 'content_copy',
			delete: 'delete',
			star: 'cards_star',
			share: 'share',
			refresh: 'refresh',
			branch: 'graph_1',
			down: 'keyboard_arrow_down',
			right: 'keyboard_arrow_right',
			more: 'more_horiz'
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
			cancelText: '取消',
			danger: true
		} as ConfirmConfig,
		confirmSave: {
			title: '保存会话',
			message: '确定要保存这个会话吗？',
			confirmText: '保存',
			cancelText: '取消',
			danger: false
		} as ConfirmConfig,
		confirmBranch: {
			title: '开启分支会话',
			message: '确定要开启这个分支会话吗？',
			confirmText: '开启',
			cancelText: '取消',
			danger: false
		} as ConfirmConfig,
		sessionActions: {
			options: [
				{ icon: '✏️', label: '重命名', action: 'edit', danger: false },
				{ icon: '📋', label: '置顶', action: 'pin', danger: false },
				{ icon: '🔀', label: '分支', action: 'branch', danger: false },
				{ icon: '🗑️', label: '删除', action: 'delete', danger: true }
			] as ItemActions[],
			option: {
				delete: 'delete',
				branch: 'branch'
			}
		},
		modeActions: {
			options: [
				{
					icon: '⌛',
					label: '临时对话',
					action: 'temp_session',
					danger: false
				},
				{
					icon: '🔀',
					label: '分支对话',
					action: 'branch_session',
					danger: false
				},
				{ icon: '🆕', label: '新对话', action: 'new_session', danger: false }
			] as ItemActions[],
			option: {
				temp: 'temp_session',
				branch: 'branch_session',
				new: 'new_session'
			}
		},
		branchActions: {
			options: [
				{ icon: '🗑️', label: '删除', action: 'delete', danger: true }
			] as ItemActions[],
			option: {
				delete: 'delete'
			}
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
