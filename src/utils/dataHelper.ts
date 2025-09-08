import type {
	ChatSession,
	DbMessage,
	DbSession,
	Message
} from '~/packages/types/chatType';

export function generateMockData(): {
	chatSessions: ChatSession[];
	messages: Message[];
} {
	// 1. chat_sessions 表数据
	const chatSessions: ChatSession[] = [
		// 主会话
		{
			id: 'this_is_a_test_id_in_case_the_random_id=-=',
			title: '测试分支喵',
			createdAt: 1756057200767,
			updatedAt: 1756057226427,
			isBranched: true,
			parentId: undefined,
			parentLastMessageId: undefined,
			userId: 'user_123',
			messages: [],
			children: []
		},
		// 分支1
		{
			id: '1756057227573_2yl1vju',
			title: '新对话',
			createdAt: 1756057227573,
			updatedAt: 1756057256851,
			isBranched: true,
			parentId: 'this_is_a_test_id_in_case_the_random_id=-=',
			parentLastMessageId: 'msg_1756057200768_l44tet7',
			userId: 'user_123',
			messages: [],
			children: []
		},
		// 分支1的子分支
		{
			id: '1756057264096_scp8u3l',
			title: '新对话',
			createdAt: 1756057264096,
			updatedAt: 1756057284626,
			isBranched: false,
			parentId: '1756057227573_2yl1vju',
			parentLastMessageId: 'msg_1756057232159_oql7t6f',
			userId: 'user_123',
			messages: [],
			children: []
		},
		// 分支2
		{
			id: '1756057289947_mjirrx9',
			title: '新对话',
			createdAt: 1756057289947,
			updatedAt: 1756057305579,
			isBranched: false,
			parentId: 'this_is_a_test_id_in_case_the_random_id=-=',
			parentLastMessageId: 'msg_1756057200768_l44tet7',
			userId: 'user_123',
			messages: [],
			children: []
		}
	];

	// 2. message 表数据
	const messages: Message[] = [
		// 主会话的消息
		{
			id: 'msg_1756057200768_xkdam7u',
			content: 'hello',
			role: 'user',
			timestamp: 1756057200768,
			isLoading: false,
			isError: false,
			sessionId: 'this_is_a_test_id_in_case_the_random_id=-='
		},
		{
			id: 'msg_1756057200768_l44tet7',
			content: `Hello! 😊  \nHow can I help you today? Whether you have a question, need assistance with something, or just want to chat—I'm here for it!`,
			role: 'model',
			timestamp: 1756057200768,
			isLoading: false,
			isError: false,
			sessionId: 'this_is_a_test_id_in_case_the_random_id=-='
		},
		{
			id: 'msg_1756057214847_6xqxbkd',
			content: 'hello again',
			role: 'user',
			timestamp: 1756057214847,
			isLoading: false,
			isError: false,
			sessionId: 'this_is_a_test_id_in_case_the_random_id=-='
		},
		{
			id: 'msg_1756057214847_9051zhy',
			content:
				"Hello again! 👋  \nNoticed your \"Thinking...\" — hope you're pondering something fun, deep, or curious! 😄  \nWhenever you're ready, I'm all ears (or eyes, technically). What's on your mind?",
			role: 'model',
			timestamp: 1756057214847,
			isLoading: false,
			isError: false,
			sessionId: 'this_is_a_test_id_in_case_the_random_id=-='
		},

		// 分支1的消息
		{
			id: 'msg_1756057232159_u1qud0d',
			content: 'goodbye',
			role: 'user',
			timestamp: 1756057232159,
			isLoading: false,
			isError: false,
			sessionId: '1756057227573_2yl1vju'
		},
		{
			id: 'msg_1756057232159_oql7t6f',
			content: `Goodbye! 👋  \nIt was nice chatting with you. If you ever need help again, I'll be right here. Take care and see you next time! 🌟`,
			role: 'model',
			timestamp: 1756057232159,
			isLoading: false,
			isError: false,
			sessionId: '1756057227573_2yl1vju'
		},
		{
			id: 'msg_1756057248528_hyxjfxs',
			content: '谢谢',
			role: 'user',
			timestamp: 1756057248528,
			isLoading: false,
			isError: false,
			sessionId: '1756057227573_2yl1vju'
		},
		{
			id: 'msg_1756057248528_jo0dzor',
			content:
				"You're very welcome! 😊  \nIf you ever need anything—whether it's a question, help, or just someone to chat with—I'm here for you anytime.  \nTake care, and see you next time! 🌟💬",
			role: 'model',
			timestamp: 1756057248528,
			isLoading: false,
			isError: false,
			sessionId: '1756057227573_2yl1vju'
		},

		// 分支1的子分支消息
		{
			id: 'msg_1756057270360_yefssgu',
			content: '拒绝',
			role: 'user',
			timestamp: 1756057270360,
			isLoading: false,
			isError: false,
			sessionId: '1756057264096_scp8u3l'
		},
		{
			id: 'msg_1756057270360_x91l94o',
			content:
				'您的消息只有一个词"拒绝"，我理解您可能是在表达某种反对或不愿继续沟通的意愿。不过，由于缺乏具体上下文，我无法确定您具体拒绝的是什么。  \n\n为了更好地帮助您，您可以：  \n1️⃣ **补充说明**：比如拒绝某个建议？拒绝继续对话？或其他具体内容？  \n2️⃣ **直接提出需求**：告诉我您需要什么，我会调整回应方式。  \n3️⃣ **简单告知状态**：例如"不想聊了""需要其他帮助"等。  \n\n我会尊重您的任何选择，等待您的进一步说明 🌟',
			role: 'model',
			timestamp: 1756057270360,
			isLoading: false,
			isError: false,
			sessionId: '1756057264096_scp8u3l'
		},

		// 分支2的消息
		{
			id: 'msg_1756057293616_jbp2oep',
			content: 'cool',
			role: 'user',
			timestamp: 1756057293616,
			isLoading: false,
			isError: false,
			sessionId: '1756057289947_mjirrx9'
		},
		{
			id: 'msg_1756057293616_d045ata',
			content: `No worries — short & sweet works too! 😎  \nWhenever you're ready, just throw me a question, topic, or task. Here are a few ideas if you'd like:\n\n- **Curious?** → "Explain quantum computing simply"  \n- **Need help?** → "Help me plan a 3-day study schedule"  \n- **Just chat?** → "What's something interesting happening in science lately?"\n\nOr surprise me! 🙌`,
			role: 'model',
			timestamp: 1756057293616,
			isLoading: false,
			isError: false,
			sessionId: '1756057289947_mjirrx9'
		}
	];

	return { chatSessions, messages };
}

export function convertDbSessionToFrontend(dbSession: DbSession): ChatSession {
	return {
		id: dbSession.id,
		title: dbSession.title,
		messages: [],
		createdAt: dbSession.created_at,
		updatedAt: dbSession.updated_at,
		isBranched: dbSession.is_branched,
		parentId: dbSession.parent_id || undefined,
		parentLastMessageId: dbSession.parent_last_message_id || undefined,
		userId: dbSession.user_id || undefined,
		children: [] // 初始为空数组，按需加载
	};
}
export function convertDbMessageToFrontend(dbMessage: DbMessage): Message {
	return {
		id: dbMessage.id,
		content: dbMessage.content,
		role: dbMessage.role,
		timestamp: dbMessage.time_stamp,
		isLoading: dbMessage.is_loading || false,
		isError: dbMessage.is_error || false,
		sessionId: dbMessage.session_id
	};
}
export function convertDbSessionsToFrontend(
	dbSessions: DbSession[]
): ChatSession[] {
	return dbSessions.map(convertDbSessionToFrontend);
}

export function convertDbMessagesToFrontend(
	dbMessages: DbMessage[]
): Message[] {
	return dbMessages.map(convertDbMessageToFrontend);
}
