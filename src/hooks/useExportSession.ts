import { snapdom } from '@zumer/snapdom';
export const useExportSession = () => {
	const exportAsImage = async () => {
		const chatBody = document.querySelector('.chat-body') as HTMLElement;
		// 保存原始样式，用于后续恢复
		const originalStyle = chatBody.style.cssText;
		// 临时移除可能导致截图异常的样式
		chatBody.style.overflow = 'visible'; // 避免滚动条干扰
		chatBody.style.height = 'auto'; // 让元素高度自适应内容
		const result = await snapdom(chatBody, {
			scale: 2,
			exclude: ['.message-actions'],
			backgroundColor: '#fff'
		});
		chatBody.style.cssText = originalStyle;
		result.download({ format: 'svg', filename: 'jethhh' });
	};

	return { exportAsImage };
};
