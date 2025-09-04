import { useEffect, useState } from 'react';

export const useScreenSize = (lgThan: number = 768) => {
	const [isLargeScreen, setIsLargeScreen] = useState(
		window.innerWidth >= lgThan
	);

	// 监听窗口大小变化
	useEffect(() => {
		const handleResize = () => {
			setIsLargeScreen(window.innerWidth > lgThan);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return [isLargeScreen];
};
