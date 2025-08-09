import { useChatStore } from '@/store/chatStore';
import { useRef, useEffect } from 'react';
import * as acorn from 'acorn';
// 这个组件展示了如何在 React 中使用 Canvas 元素
const App = () => {
	// 1. 使用 useRef 创建一个 ref，用于引用 canvas 元素
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const chatMessages = useChatStore().getCurrentMessages();
	const codeContent = chatMessages?.at(-1)?.content;
	function processCodeContent(codeContent: string) {
		// 移除开头的```javascript（包括可能的换行）
		let processed = codeContent.replace(/^```javascript[\r\n]*/, '');
		// 移除结尾的```（包括可能的前面的换行）
		processed = processed.replace(/[\r\n]*```$/, '');
		return processed;
	}

	//2. 使用 useEffect 钩子，确保在组件挂载后执行绘图逻辑
	useEffect(() => {
		// 确保 ref.current 存在
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		// 获取 2D 渲染上下文
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		try {
			if (
				codeContent &&
				acorn.parse(processCodeContent(codeContent), { ecmaVersion: 'latest' })
			) {
				eval(processCodeContent(codeContent));
			}
		} catch (e) {
			console.log(codeContent, '   ', e);
		}
		console.log(codeContent);
	}, [codeContent]); // 空数组依赖项表示此 effect 只在组件挂载和卸载时运行一次
	return (
		<canvas
			ref={canvasRef}
			width="375.20"
			height="677.20"
			className="border border-gray-400 rounded-md"
		></canvas>
	);
};

export default App;
