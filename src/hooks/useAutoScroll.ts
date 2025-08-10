import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppConfig } from './useConfig';

export const useAutoScroll = () => {
	const containerRef = useRef<HTMLElement>(null);
	const [isAutoScroll, setIsAutoScroll] = useState(true);
	const { touch } = useAppConfig();

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
			const isNearBottom =
				scrollHeight - scrollTop - clientHeight < touch.scrollTolerance; //容差
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
