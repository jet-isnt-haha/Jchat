import {
	convertDbMessagesToFrontend,
	convertDbSessionsToFrontend
} from '@/utils/dataHelper';
import supabase from '@/utils/supabase';
import type {
	ChatSession,
	DbMessage,
	Message
} from '~/packages/types/chatType';

export async function getMainSessions(): Promise<ChatSession[]> {
	const { data: dbSessions, error } = await supabase
		.from('chat_session')
		.select('id, title, created_at, updated_at, is_branched')
		.is('parent_id', null);

	if (error) {
		console.error('查询会话失败:', error);
		return [];
	}

	return convertDbSessionsToFrontend(dbSessions) ?? [];
}

export async function getMessages(sessionId: string): Promise<Message[]> {
	const { data: dbMessages, error } = await supabase
		.from('message')
		.select('*')
		.eq('session_id', sessionId)
		.order('time_stamp');

	if (error) {
		console.error('查询消息失败:', error);
		return [];
	}

	return convertDbMessagesToFrontend(dbMessages) ?? [];
}

export async function insertChatSession(chatSession: Partial<ChatSession>) {
	const {
		id,
		title,
		createdAt,
		updatedAt,
		isBranched,
		parentId,
		parentLastMessageId,
		userId
	} = chatSession;
	try {
		const { data, error } = await supabase
			.from('chat_session')
			.insert([
				{
					id: id,
					title: title,
					created_at: createdAt,
					updated_at: updatedAt,
					is_branched: isBranched,
					parent_id: parentId,
					parent_last_message_id: parentLastMessageId,
					user_id: userId
				}
			])
			.select();

		if (error) {
			console.error('插入聊天会话失败:', error);
			return {
				success: false,
				error: error.message
			};
		}

		return {
			success: true,
			data
		};
	} catch (err) {
		console.error('插入聊天会话时发生未预期错误:', err);
		return {
			success: false,
			error: '操作失败，请稍后重试'
		};
	}
}

export async function insertChatMessage(message: Partial<Message>) {
	const { id, content, role, timestamp, isLoading, isError, sessionId } =
		message;
	try {
		const { data, error } = await supabase
			.from('message')
			.insert([
				{
					id: id,
					content: content,
					role: role,
					time_stamp: timestamp,
					session_id: sessionId,
					is_loading: isLoading || false,
					is_error: isError || false
				}
			])
			.select();
		if (error) {
			console.error('插入消息失败:', error);
			return {
				success: false,
				error: error.message
			};
		}

		return {
			success: true,
			data
		};
	} catch (err) {
		console.error('插入聊天消息时发生未预期错误:', err);
		return {
			success: false,
			error: '操作失败，请稍后重试'
		};
	}
}
export async function updateChatMessage(
	messageId: string,
	update: Partial<Message>
) {
	const { id, content, role, timestamp, isLoading, isError } = update;
	const { data: updatedDbMessage, error } = await supabase
		.from('message')
		.update([
			{
				id: id,
				content: content,
				role: role,
				time_stamp: timestamp,
				is_loading: isLoading || false,
				is_error: isError || false
			}
		])
		.eq('id', messageId)
		.select();
	if (error) {
		console.error('更新消息失败:', error);
		return {
			success: false,
			error: error.message
		};
	}

	return {
		success: true,
		data: updatedDbMessage
	};
}
export async function getChildrenSessions(parentId: string) {
	const { data: childrenDbSessions, error } = await supabase
		.from('chat_session')
		.select('*')
		.eq('parent_id', parentId)
		.order('created_at');

	if (error) {
		console.error('查询子会话失败:', error);
		return [];
	}

	console.log(childrenDbSessions);
	return convertDbSessionsToFrontend(childrenDbSessions) ?? [];
}

export async function getChildMessages(sessionId: string): Promise<Message[]> {
	const originalMessages = await getMessages(sessionId);

	const { data: session, error: error1 } = await supabase
		.from('chat_session')
		.select('*')
		.eq('id', sessionId)
		.single();
	if (
		error1 ||
		!session ||
		!session.parent_id ||
		!session.parent_last_message_id
	) {
		return originalMessages;
	}
	// 递归函数：收集所有祖先会话的消息
	async function collectInheritedMessages(
		parentId: string,
		lastMessageId: string
	): Promise<DbMessage[]> {
		// 获取分支点消息的时间戳
		const { data: branchPointMsg } = await supabase
			.from('message')
			.select('time_stamp')
			.eq('id', lastMessageId)
			.single();

		if (!branchPointMsg) {
			console.warn(`未找到分支点消息: ${lastMessageId}`);
			return [];
		}

		// 获取父会话中直到分支点的消息
		const { data: directInheritedMessages, error } = await supabase
			.from('message')
			.select('*')
			.eq('session_id', parentId)
			.lte('time_stamp', branchPointMsg.time_stamp)
			.order('time_stamp');

		if (error) {
			console.error(`获取父会话 ${parentId} 消息失败:`, error);
			return [];
		}

		// 获取父会话信息
		const { data: parentSession } = await supabase
			.from('chat_session')
			.select('*')
			.eq('id', parentId)
			.single();

		// 如果父会话还有父会话，递归收集
		let ancestorMessages: DbMessage[] = [];
		if (parentSession?.parent_id && parentSession?.parent_last_message_id) {
			ancestorMessages = await collectInheritedMessages(
				parentSession.parent_id,
				parentSession.parent_last_message_id
			);
		}

		// 合并本层和上层的消息
		return [...ancestorMessages, ...(directInheritedMessages || [])];
	}
	const inheritedMessages = await collectInheritedMessages(
		session.parent_id,
		session.parent_last_message_id
	);

	const childMessages = [
		...convertDbMessagesToFrontend(inheritedMessages),
		...originalMessages
	].sort((a, b) => a.timestamp - b.timestamp);
	console.log(childMessages);
	return childMessages ?? [];
}

export async function deleteSession(
	sessionId: string
): Promise<{ success: boolean; error?: Error | string; message?: string }> {
	//查找所有直接子会话
	const { data: childSessions, error: findError } = await supabase
		.from('chat_session')
		.select('id')
		.eq('parent_id', sessionId);
	if (findError) {
		console.error('查找子会话失败:', findError);
		return { success: false, error: findError, message: '查找子会话失败' };
	}

	//递归删除所有子会话
	for (const childSession of childSessions || []) {
		const childResult = await deleteSession(childSession.id);
		if (!childResult.success) {
			console.error('删除子会话失败:', childSession.id, childResult.error);
			return {
				success: false,
				error: childResult.error,
				message: `删除子会话 ${childSession.id} 失败`
			};
		}
	}

	const { error: messagesError } = await supabase
		.from('message')
		.delete()
		.eq('session_id', sessionId);

	if (messagesError) {
		console.error('删除消息失败:', messagesError);
		return { success: false, error: messagesError, message: '删除消息失败' };
	}

	const { error: sessionError } = await supabase
		.from('chat_session')
		.delete()
		.eq('id', sessionId);
	if (sessionError) {
		console.error('删除会话失败:', sessionError);
		return { success: false, error: sessionError, message: '删除会话失败' };
	}
	return {
		success: true,
		message: `会话 ${sessionId} 及其所有子会话已成功删除`
	};
}

export async function deleteMessage(messageId: string) {
	const { error } = await supabase.from('message').delete().eq('id', messageId);
	if (error) {
		console.error('删除消息失败', error);
		return;
	}
}
