import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

type useRowVirtualizerOptions = {
	count: number;
	estimateSize: number;
	overscan?: number;
};

export const useRowVirtualizer = (options: useRowVirtualizerOptions) => {
	//滚动容器引用
	const { count, estimateSize, overscan } = options;
	const parentRef = useRef<HTMLElement>(null);

	const rowVirtualizer = useVirtualizer({
		count,
		estimateSize: () => estimateSize,
		overscan,
		getScrollElement: () => parentRef.current
	});

	return { parentRef, rowVirtualizer };
};
