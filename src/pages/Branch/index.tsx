import BranchCollapse from './components/BranchCollapse';
import IconButton from '@/components/ui/IconButton';
import { useAppConfig, useTexts } from '@/hooks/useConfig';
import { useScreenSize } from '@/hooks/useScreenSize';
import { useChatStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import type { ChatSession } from '@/types/chatType'; // 导入 ChatSession 类型

// 自定义空状态组件（无第三方库，原生实现）
const EmptyState = ({ text }: { text: string }) => (
	<div className="flex flex-col items-center justify-center h-full text-gray-400">
		{/* 简单图标（用文字替代，也可换为 svg） */}
		<div className="text-4xl mb-4">📂</div>
		<p className="text-sm">{text}</p>
	</div>
);

// 自定义加载组件（原生实现）
// const LoadingState = () => (
// 	<div className="flex flex-col items-center justify-center h-full text-gray-400">
// 		<div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
// 		<p className="text-sm">正在加载分支树...</p>
// 	</div>
// );

const Branch = () => {
	const { currentSessionId, findRootSessionById } = useChatStore();
	const { icons } = useTexts();
	const { routes } = useAppConfig();
	const navigate = useNavigate();
	const [isLargeScreen] = useScreenSize(768);
	// 1. 类型防护：解决 currentSessionId 为 null 的问题
	// 只有 currentSessionId 存在时，才调用 findRootSessionById
	const rootSession: ChatSession | null = currentSessionId
		? findRootSessionById(currentSessionId)
		: null;

	// 2. 场景判断：按不同状态返回对应内容（避免 null 传递给子组件）
	const renderContent = () => {
		// 场景2：未指定 sessionId（currentSessionId 为 null）
		if (!currentSessionId) {
			return <EmptyState text="未选择对话，请先打开一个会话" />;
		}

		// 场景3：找不到根会话（currentSessionId 存在，但查询结果为 null）
		if (!rootSession) {
			return <EmptyState text="未找到当前会话的分支根节点" />;
		}

		// 场景4：有根会话，但无任何分支（可选：提示用户可创建分支）
		if (rootSession.children.length === 0 && !rootSession.isBranched) {
			return (
				<div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
					<div className="text-4xl mb-4">🌱</div>
					<p className="text-sm mb-2">当前会话暂无分支</p>
					<p className="text-xs">在对话中点击「分支」按钮可创建新分支</p>
				</div>
			);
		}

		// 场景5：正常有分支，渲染分支树
		return <BranchCollapse session={rootSession} />;
	};

	return (
		<section className="w-full h-screen min-h-[100dvh] flex flex-col bg-white overflow-hidden relative">
			<header className="flex items-center justify-center px-[22px] py-[15px] bg-[#f6f2ff] z-10 border-b border-[#ebe5ff]">
				{!isLargeScreen && (
					<IconButton
						className={icons.left_back}
						styleClass="absolute left-2 cursor-pointer hover:bg-gray-200 rounded-md"
						onClick={() => navigate(`${routes.home}/${currentSessionId}`)}
					/>
				)}
				<h2 className="font-medium text-gray-800">分支树导航</h2>
			</header>

			<main className="flex-1 overflow-y-auto p-4">{renderContent()}</main>
		</section>
	);
};

export default Branch;
