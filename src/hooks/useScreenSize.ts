import { useEffect, useState } from 'react';

export const useScreenSize = (lgThan: number) => {
	const [isLargeScreen, setIsLargeScreen] = useState(
		window.innerWidth >= lgThan
	);

	// 监听窗口大小变化
	useEffect(() => {
		const handleResize = () => {
			setIsLargeScreen(window.innerWidth >= 1024);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return [isLargeScreen];
};
