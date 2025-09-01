import { describe, it, expect, beforeEach } from 'vitest';
import type { ChatSession, Message } from '~/packages/types/chatType';
import {
	addMessageToChatSession,
	updateMessageInChatSession,
	deleteMessageFromChatSession
} from '../sessionHelper';

describe('sessionHelper', () => {
	let mockSession: ChatSession;
	let mockMessage: Message;

	beforeEach(() => {
		// 每个测试前重置数据
		mockSession = {
			id: 'test-session-1',
			title: '测试会话',
			messages: [],
			createdAt: Date.now() - 1000,
			updatedAt: Date.now() - 1000,
			children: []
		};

		mockMessage = {
			id: 'test-msg-1',
			content: 'Hello World',
			role: 'user',
			timestamp: Date.now()
		};
	});

	describe('addMessageToChatSession', () => {
		it('应该成功添加消息到空会话', () => {
			const result = addMessageToChatSession(mockSession, mockMessage);

			expect(result.messages).toHaveLength(1);
			expect(result.messages[0]).toEqual(mockMessage);
			expect(result.updatedAt).toBeGreaterThan(mockSession.updatedAt);
			expect(result.id).toBe(mockSession.id);
		});
	});

	describe('updateMessageInChatSession', () => {
		beforeEach(() => {
			mockSession.messages = [mockMessage];
		});

		it('应该成功更新指定的消息', () => {
			const updatedMessage: Message = {
				...mockMessage,
				content: 'update',
				isLoading: false
			};

			const result = updateMessageInChatSession(
				mockSession,
				mockMessage.id,
				updatedMessage
			);

			expect(result.messages[0].content).toBe('update');
			expect(result.messages[0].isLoading).toBe(false);
			expect(result.updatedAt).toBeGreaterThan(mockSession.updatedAt);
		});
	});

	describe('deleteMessageFromChatSession', () => {
		beforeEach(() => {
			const message2: Message = {
				id: 'msg-789',
				content: '第二条消息',
				role: 'model',
				timestamp: Date.now() + 100
			};
			mockSession.messages = [mockMessage, message2];
		});

		it('应该成功删除指定消息', () => {
			const result = deleteMessageFromChatSession(mockSession, mockMessage.id);

			expect(result.messages).toHaveLength(1);
			expect(result.messages[0].id).toBe('msg-789');
			expect(result.messages[0].content).toBe('第二条消息');
		});
	});
});
