import { useCallback, useEffect, useRef, useState } from 'react';

export const useAutoScroll = () => {
	const containerRef = useRef<HTMLElement>(null);
	const [isAutoScroll, setIsAutoScroll] = useState(true);

	const autoScrollToBottom = () => {
		if (isAutoScroll) {
			scrollToBottom();
		}
	};
	const forceScrollToBottom = () => {
		scrollToBottom();
	};
	const scrollToBottom = useCallback(() => {
		if (containerRef.current) {
			containerRef.current.scrollTo({
				top: containerRef.current.scrollHeight,
				behavior: 'smooth'
			});
		}
	}, []);

	//用户主动滚动时，取消自动滚动
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = container;
			const isNearBottom = scrollHeight - scrollTop - clientHeight < 30; //30px容差
			setIsAutoScroll(isNearBottom);
		};
		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, []);

	return {
		containerRef,
		isAutoScroll,
		setIsAutoScroll,
		autoScrollToBottom,
		forceScrollToBottom
	};
};
