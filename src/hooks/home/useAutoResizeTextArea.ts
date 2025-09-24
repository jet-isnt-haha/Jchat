import { useRef, useEffect, useCallback } from 'react';

export const useAutoResizeTextarea = () => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustHeight = useCallback(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}, []);

	useEffect(() => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		// 使用 ResizeObserver 监听内容区域变化
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				// 当内容发生变化时调整高度
				if (entry.target === textarea) {
					requestAnimationFrame(() => {
						adjustHeight();
					});
				}
			}
		});

		resizeObserver.observe(textarea);

		// 初始调整
		adjustHeight();

		return () => {
			resizeObserver.disconnect();
		};
	}, [adjustHeight]);

	return {
		textareaRef,
		adjustHeight
	};
};
