import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { generateMockData } from './dataHelper';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
export async function insertDataToSupabase(supabase: SupabaseClient) {
	const { chatSessions, messages } = generateMockData();

	try {
		// 1. 插入会话 (手动映射字段名)
		const sessionsForDB = chatSessions.map((session) => ({
			id: session.id,
			title: session.title,
			created_at: session.createdAt,
			updated_at: session.updatedAt,
			is_branched: session.isBranched,
			parent_id: session.parentId,
			parent_last_message_id: session.parentLastMessageId,
			user_id: session.userId
		}));

		const { error: sessionsError } = await supabase
			.from('chat_session')
			.insert(sessionsForDB);

		if (sessionsError) {
			console.error('插入会话失败:', sessionsError);
			return;
		}

		// 2. 插入消息 (手动映射字段名)
		const messagesForDB = messages.map((message) => ({
			id: message.id,
			content: message.content,
			role: message.role,
			time_stamp: message.timestamp,
			is_loading: message.isLoading,
			is_error: message.isError,
			session_id: message.sessionId
		}));

		const { error: messagesError } = await supabase
			.from('message')
			.insert(messagesForDB);

		if (messagesError) {
			console.error('插入消息失败:', messagesError);
			return;
		}

		console.log('✅ 数据插入成功!');
	} catch (error) {
		console.error('❌ 插入数据时发生错误:', error);
	}
}
