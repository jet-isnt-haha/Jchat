import { useRef } from 'react';
import { useAppConfig } from './useConfig';

export const useTouchController = () => {
	const { touch: _touch } = useAppConfig();
	const longPressTimer = useRef<ReturnType<typeof setTimeout>>(null);
	const touchStart = useRef({ x: 0, y: 0, time: 0 });
	const hasMoved = useRef(false);

	const handleTouchStart =
		(handleTouchEvent: () => void) => (e: React.TouchEvent<HTMLDivElement>) => {
			const touch = e.touches[0];
			touchStart.current = {
				x: touch.clientX,
				y: touch.clientY,
				time: Date.now()
			};
			hasMoved.current = false;
			// 清除之前的定时器
			if (longPressTimer.current) {
				clearTimeout(longPressTimer.current);
			}

			longPressTimer.current = setTimeout(() => {
				if (!hasMoved.current) {
					handleTouchEvent();
				}
			}, _touch.longPressDelay);
		};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		if (!touchStart.current.time) return;

		const touch = e.touches[0];
		const deltaX = Math.abs(touch.clientX - touchStart.current.x);
		const deltaY = Math.abs(touch.clientY - touchStart.current.y);
		// 如果移动距离超过阈值，标记为已移动
		if (deltaX > _touch.moveThreshold || deltaY > _touch.moveThreshold) {
			hasMoved.current = true;
			// 取消长按定时器
			if (longPressTimer.current) {
				clearTimeout(longPressTimer.current);
				longPressTimer.current = null;
			}
		}
	};
	const handleTouchEnd = () => {
		if (longPressTimer.current) {
			clearTimeout(longPressTimer.current);
			longPressTimer.current = null;
		}

		// 重置状态
		touchStart.current = { x: 0, y: 0, time: 0 };
		hasMoved.current = false;
	};

	return { handleTouchStart, handleTouchEnd, handleTouchMove };
};
