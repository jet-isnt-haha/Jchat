// src/mocks/chatData.ts
import { faker } from '@faker-js/faker';
import type { Message, ChatSession } from '@/types/chatType';
// 类型定义（与你的实际类型保持一致）

// 预定义的对话主题和内容
const conversationTopics = [
	'如何学习编程',
	'旅行计划建议',
	'健康饮食指导',
	'工作效率提升',
	'人工智能发展',
	'理财投资建议',
	'学习新语言',
	'创业想法讨论',
	'电影推荐',
	'书籍阅读建议'
];

const userQuestions = [
	'你能帮我解释一下这个概念吗？',
	'我应该如何开始学习这个？',
	'有什么好的建议吗？',
	'你觉得这样做怎么样？',
	'能给我一些具体的例子吗？',
	'这个问题该怎么解决？',
	'你有相关的经验分享吗？',
	'我遇到了困难，该怎么办？',
	'能详细说明一下吗？',
	'还有其他的方法吗？'
];

const assistantResponses = [
	'当然可以！让我为你详细解释一下...',
	'这是一个很好的问题。根据我的了解...',
	'我建议你可以从以下几个方面开始...',
	'基于你的情况，我认为...',
	'这里有几个实用的建议...',
	'让我分享一些相关的经验...',
	'你可以尝试以下几种方法...',
	'这个问题确实比较复杂，我们可以这样分析...',
	'从实践的角度来看...',
	'综合考虑各种因素...'
];

// 生成单条消息
function generateMessage(role: Message['role'], index: number): Message {
	let content: string;

	if (role === 'user') {
		content =
			faker.helpers.arrayElement(userQuestions) + ' ' + faker.lorem.sentence();
	} else if (role === 'model') {
		content =
			faker.helpers.arrayElement(assistantResponses) +
			' ' +
			faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }));
	} else {
		content = faker.lorem.sentence();
	}

	return {
		id: `msg_${faker.string.uuid()}`,
		content,
		role,
		timestamp: Date.now() - 1000 * 60 * index, // 按时间倒序
		isLoading: false
	};
}

// 生成消息对话
function generateConversation(messageCount: number = 6): Message[] {
	const messages: Message[] = [];

	for (let i = 0; i < messageCount; i += 2) {
		// 用户消息
		messages.push(generateMessage('user', i));

		// 助手回复（如果不是最后一条）
		if (i + 1 < messageCount) {
			messages.push(generateMessage('model', i + 1));
		}
	}

	return messages.sort((a, b) => a.timestamp - b.timestamp); // 按时间正序排列
}

// 生成单个会话
function generateSession(index: number = 0): ChatSession {
	const messageCount = faker.number.int({ min: 2, max: 20 });
	const messages = generateConversation(messageCount);
	const createdAt = Date.now() - 1000 * 60 * 60 * 24 * index; // 每个会话间隔一天

	return {
		id: `${faker.string.uuid()}`,
		title: faker.helpers.arrayElement(conversationTopics),
		messages,
		createdAt,
		updatedAt: createdAt + 1000 * 60 * faker.number.int({ min: 5, max: 120 }), // 更新时间稍晚
		children: []
	};
}

// 生成多个会话
export function generateMockSessions(count: number = 5): ChatSession[] {
	return Array.from({ length: count }, (_, index) => generateSession(index));
}

// 生成特定类型的会话
export function generateEmptySession(): ChatSession {
	return {
		id: `${faker.string.uuid()}`,
		title: '新对话',
		messages: [],
		createdAt: Date.now(),
		updatedAt: Date.now(),
		children: []
	};
}

export function generateActiveSession(): ChatSession {
	let session = generateSession();
	// 最后一条消息是用户消息，模拟等待回复的状态
	const lastMessage: Message = {
		id: `msg_${faker.string.uuid()}`,
		content: faker.helpers.arrayElement(userQuestions),
		role: 'user',
		timestamp: Date.now() - 1000,
		isLoading: false
	};

	session.messages.push(lastMessage);
	session.updatedAt = Date.now();
	session.id = 'this_is_a_test_id_in_case_the_random_id=-=';
	session = {
		id: 'this_is_a_test_id_in_case_the_random_id=-=',
		title: '测试分支喵',
		messages: [
			{
				content: 'hello',
				role: 'user',
				id: 'msg_1756057200768_xkdam7u',
				timestamp: 1756057200768
			},
			{
				content:
					'Hello! 😊  \nHow can I help you today? Whether you have a question, need assistance with something, or just want to chat—I’m here for it!',
				role: 'model',
				isLoading: false,
				id: 'msg_1756057200768_l44tet7',
				timestamp: 1756057200768
			},
			{
				content: 'hello again',
				role: 'user',
				id: 'msg_1756057214847_6xqxbkd',
				timestamp: 1756057214847
			},
			{
				content:
					"Hello again! 👋  \nNoticed your \"Thinking...\" — hope you're pondering something fun, deep, or curious! 😄  \nWhenever you're ready, I'm all ears (or eyes, technically). What’s on your mind?",
				role: 'model',
				isLoading: false,
				id: 'msg_1756057214847_9051zhy',
				timestamp: 1756057214847
			}
		],
		createdAt: 1756057200767,
		updatedAt: 1756057226427,
		isBranched: true,
		children: [
			{
				id: '1756057227573_2yl1vju',
				title: '新对话',
				messages: [
					{
						content: 'hello',
						role: 'user',
						id: 'msg_1756057200768_xkdam7u',
						timestamp: 1756057200768
					},
					{
						content:
							'Hello! 😊  \nHow can I help you today? Whether you have a question, need assistance with something, or just want to chat—I’m here for it!',
						role: 'model',
						isLoading: false,
						id: 'msg_1756057200768_l44tet7',
						timestamp: 1756057200768
					},
					{
						content: 'goodbye',
						role: 'user',
						id: 'msg_1756057232159_u1qud0d',
						timestamp: 1756057232159
					},
					{
						content:
							'Goodbye! 👋  \nIt was nice chatting with you. If you ever need help again, I’ll be right here. Take care and see you next time! 🌟',
						role: 'model',
						isLoading: false,
						id: 'msg_1756057232159_oql7t6f',
						timestamp: 1756057232159
					},
					{
						content: '谢谢',
						role: 'user',
						id: 'msg_1756057248528_hyxjfxs',
						timestamp: 1756057248528
					},
					{
						content:
							"You're very welcome! 😊  \nIf you ever need anything—whether it’s a question, help, or just someone to chat with—I’m here for you anytime.  \nTake care, and see you next time! 🌟💬",
						role: 'model',
						isLoading: false,
						id: 'msg_1756057248528_jo0dzor',
						timestamp: 1756057248528
					}
				],
				createdAt: 1756057227573,
				updatedAt: 1756057256851,
				isBranched: true,
				children: [
					{
						id: '1756057264096_scp8u3l',
						title: '新对话',
						messages: [
							{
								content: 'hello',
								role: 'user',
								id: 'msg_1756057200768_xkdam7u',
								timestamp: 1756057200768
							},
							{
								content:
									'Hello! 😊  \nHow can I help you today? Whether you have a question, need assistance with something, or just want to chat—I’m here for it!',
								role: 'model',
								isLoading: false,
								id: 'msg_1756057200768_l44tet7',
								timestamp: 1756057200768
							},
							{
								content: 'goodbye',
								role: 'user',
								id: 'msg_1756057232159_u1qud0d',
								timestamp: 1756057232159
							},
							{
								content:
									'Goodbye! 👋  \nIt was nice chatting with you. If you ever need help again, I’ll be right here. Take care and see you next time! 🌟',
								role: 'model',
								isLoading: false,
								id: 'msg_1756057232159_oql7t6f',
								timestamp: 1756057232159
							},
							{
								content: '拒绝',
								role: 'user',
								id: 'msg_1756057270360_yefssgu',
								timestamp: 1756057270360
							},
							{
								content:
									'您的消息只有一个词“拒绝”，我理解您可能是在表达某种反对或不愿继续沟通的意愿。不过，由于缺乏具体上下文，我无法确定您具体拒绝的是什么。  \n\n为了更好地帮助您，您可以：  \n1️⃣ **补充说明**：比如拒绝某个建议？拒绝继续对话？或其他具体内容？  \n2️⃣ **直接提出需求**：告诉我您需要什么，我会调整回应方式。  \n3️⃣ **简单告知状态**：例如“不想聊了”“需要其他帮助”等。  \n\n我会尊重您的任何选择，等待您的进一步说明 🌟',
								role: 'model',
								isLoading: false,
								id: 'msg_1756057270360_x91l94o',
								timestamp: 1756057270360
							}
						],
						createdAt: 1756057264096,
						updatedAt: 1756057284626,
						isBranched: false,
						children: [],
						parentId: '1756057227573_2yl1vju',
						parentLastMessageId: 'msg_1756057232159_oql7t6f'
					}
				],
				parentId: 'this_is_a_test_id_in_case_the_random_id=-=',
				parentLastMessageId: 'msg_1756057200768_l44tet7'
			},
			{
				id: '1756057289947_mjirrx9',
				title: '新对话',
				messages: [
					{
						content: 'hello',
						role: 'user',
						id: 'msg_1756057200768_xkdam7u',
						timestamp: 1756057200768
					},
					{
						content:
							'Hello! 😊  \nHow can I help you today? Whether you have a question, need assistance with something, or just want to chat—I’m here for it!',
						role: 'model',
						isLoading: false,
						id: 'msg_1756057200768_l44tet7',
						timestamp: 1756057200768
					},
					{
						content: 'cool',
						role: 'user',
						id: 'msg_1756057293616_jbp2oep',
						timestamp: 1756057293616
					},
					{
						content:
							'No worries — short & sweet works too! 😎  \nWhenever you\'re ready, just throw me a question, topic, or task. Here are a few ideas if you’d like:\n\n- **Curious?** → "Explain quantum computing simply"  \n- **Need help?** → "Help me plan a 3-day study schedule"  \n- **Just chat?** → "What’s something interesting happening in science lately?"\n\nOr surprise me! 🙌',
						role: 'model',
						isLoading: false,
						id: 'msg_1756057293616_d045ata',
						timestamp: 1756057293616
					}
				],
				createdAt: 1756057289947,
				updatedAt: 1756057305579,
				isBranched: false,
				children: [],
				parentId: 'this_is_a_test_id_in_case_the_random_id=-=',
				parentLastMessageId: 'msg_1756057200768_l44tet7'
			}
		]
	};
	return session;
}

export function generateLongSession(): ChatSession {
	const session = generateSession();
	session.messages = generateConversation(30); // 生成30条消息的长对话
	session.title = '深度讨论：' + faker.helpers.arrayElement(conversationTopics);

	return session;
}

// 默认导出一组预设的测试数据
export const mockChatSessions: ChatSession[] = [
	generateActiveSession(), // 当前活跃会话
	generateSession(), // 普通会话
	generateLongSession(), // 长对话会话
	generateEmptySession(),
	...generateMockSessions(1000) // 额外3个随机会话
];

// 开发环境下的调试工具
export const mockUtils = {
	// 快速生成测试数据
	generateQuickTestData: () => ({
		sessions: generateMockSessions(3),
		currentSessionId: null
	}),

	// 生成有当前会话的测试数据
	generateWithCurrentSession: () => {
		const sessions = generateMockSessions(5);
		return {
			sessions,
			currentSessionId: sessions[0].id
		};
	},

	// 生成大量数据用于性能测试
	generateLargeDataset: () => ({
		sessions: generateMockSessions(50),
		currentSessionId: null
	}),

	// 生成边界情况测试数据
	generateEdgeCases: () => ({
		sessions: [
			generateEmptySession(),
			generateLongSession(),
			{
				...generateSession(),
				title: faker.lorem.words(20) // 超长标题
			},
			{
				...generateSession(),
				messages: [
					{
						id: `msg_${faker.string.uuid()}`,
						content: faker.lorem.paragraphs(10), // 超长消息
						role: 'assistant' as const,
						timestamp: Date.now(),
						isLoading: false
					}
				]
			}
		],
		currentSessionId: null
	})
};
