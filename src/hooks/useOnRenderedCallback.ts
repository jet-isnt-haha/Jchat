import { useEffect } from 'react';

/**
 * 当目标内容渲染完成后执行回调（处理类型安全和时机问题）
 * @param renderedContent 已渲染的内容（非空时视为渲染完成）
 * @param callback 渲染完成后需要执行的回调（可选）
 * @param delay 延迟执行时间（默认 0ms，确保浏览器布局完成）
 */
export const useOnRenderedCallback = (
	renderedContent: string | undefined,
	callback?: () => void,
	delay = 0
) => {
	useEffect(() => {
		if (renderedContent && callback) {
			const timer = setTimeout(() => {
				callback();
			}, delay);

			return () => clearTimeout(timer);
		}
	}, [renderedContent, callback, delay]);
};
