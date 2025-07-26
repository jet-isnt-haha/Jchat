// src/mocks/chatData.ts
import { faker } from '@faker-js/faker';
import type { Message, ChatSession } from '~/packages/types/chatType';
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
		id: `session_${faker.string.uuid()}`,
		title: faker.helpers.arrayElement(conversationTopics),
		messages,
		createdAt,
		updatedAt: createdAt + 1000 * 60 * faker.number.int({ min: 5, max: 120 }) // 更新时间稍晚
	};
}

// 生成多个会话
export function generateMockSessions(count: number = 5): ChatSession[] {
	return Array.from({ length: count }, (_, index) => generateSession(index));
}

// 生成特定类型的会话
export function generateEmptySession(): ChatSession {
	return {
		id: `session_${faker.string.uuid()}`,
		title: '新对话',
		messages: [],
		createdAt: Date.now(),
		updatedAt: Date.now()
	};
}

export function generateActiveSession(): ChatSession {
	const session = generateSession();
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
	generateEmptySession(), // 空会话
	...generateMockSessions(3) // 额外3个随机会话
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

// 中文支持的版本
export function generateChineseMockSessions(count: number = 5): ChatSession[] {
	const chineseTopics = [
		'如何提高工作效率',
		'健康生活方式建议',
		'学习编程的最佳路径',
		'旅游景点推荐',
		'美食制作指南',
		'投资理财建议',
		'职业规划讨论',
		'技术发展趋势',
		'读书心得分享',
		'生活小技巧'
	];

	const chineseUserQuestions = [
		'请问你能详细解释一下吗？',
		'我该如何开始学习这个？',
		'你有什么好的建议吗？',
		'这种方法真的有效吗？',
		'能给我举个具体的例子吗？',
		'遇到这种情况应该怎么处理？',
		'你觉得这样做合适吗？',
		'还有其他的解决方案吗？',
		'我应该注意哪些问题？',
		'能推荐一些相关资源吗？'
	];

	const chineseAssistantResponses = [
		'当然可以！让我为您详细说明一下...',
		'这确实是个很好的问题，根据我的理解...',
		'我建议您可以从以下几个方面入手...',
		'基于您的情况，我认为最好的方法是...',
		'这里有几个实用的建议供您参考...',
		'让我分享一些相关的经验和见解...',
		'您可以尝试以下几种不同的方法...',
		'这个问题确实需要仔细考虑，我们可以这样分析...',
		'从实际应用的角度来看...',
		'综合各种因素考虑...'
	];

	return Array.from({ length: count }, (_, index) => {
		const messageCount = faker.number.int({ min: 2, max: 12 });
		const messages: Message[] = [];

		for (let i = 0; i < messageCount; i += 2) {
			// 用户消息
			messages.push({
				id: `msg_${faker.string.uuid()}`,
				content: faker.helpers.arrayElement(chineseUserQuestions),
				role: 'user',
				timestamp: Date.now() - 1000 * 60 * i,
				isLoading: false
			});

			// 助手回复
			if (i + 1 < messageCount) {
				messages.push({
					id: `msg_${faker.string.uuid()}`,
					content:
						faker.helpers.arrayElement(chineseAssistantResponses) +
						faker.lorem.paragraphs(1),
					role: 'model',
					timestamp: Date.now() - 1000 * 60 * (i + 1),
					isLoading: false
				});
			}
		}

		const createdAt = Date.now() - 1000 * 60 * 60 * 24 * index;

		return {
			id: `session_${faker.string.uuid()}`,
			title: faker.helpers.arrayElement(chineseTopics),
			messages: messages.sort((a, b) => a.timestamp - b.timestamp),
			createdAt,
			updatedAt: createdAt + 1000 * 60 * faker.number.int({ min: 5, max: 120 })
		};
	});
}
