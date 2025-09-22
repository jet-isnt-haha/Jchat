//自定义虚拟列表组件
import { useState } from 'react';

interface VirtualizedListProps {
	itemCount: number;
	itemSize: number;
	height: number;
	overscan?: number;
	itemKey?: (index: number) => string;
	className?: string;
	children: (args: {
		index: number;
		style: React.CSSProperties;
	}) => React.ReactNode;
}

const VirtualizedList = ({
	itemCount,
	itemSize,
	height,
	overscan = 2,
	itemKey,
	children: Child
}: VirtualizedListProps) => {
	const [scrollOffset, setScrollOffset] = useState(0);
	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const { scrollTop } = e.currentTarget;
		setScrollOffset(scrollTop);
	};

	const generateCurrentChildren = () => {
		const startIndex = Math.floor(scrollOffset / itemSize);

		//上缓冲区起始索引
		const finalStartIndex = Math.max(0, startIndex - overscan);

		//可视区域最大元素数
		const visibleNum = Math.ceil(height / itemSize);

		//下缓冲区结束索引
		const endIndex = Math.min(visibleNum + startIndex + overscan, itemCount);

		const items: React.ReactNode[] = [];

		for (let i = finalStartIndex; i < endIndex; ++i) {
			const itemStyle: React.CSSProperties = {
				position: 'absolute',
				top: itemSize * i,
				height: itemSize,
				width: '100%',
				willChange: 'transform'
			};
			items.push(
				<Child style={itemStyle} index={i} key={itemKey ? itemKey(i) : i} />
			);
		}
		return items;
	};

	return (
		<div
			className=" w-full  overflow-y-auto scrollbar-thin scrollbar-thumb-[#ddd3f9] scrollbar-track-transparent "
			style={{ height }}
			onScroll={handleScroll}
		>
			<div
				className="w-full relative"
				style={{ height: `${(itemCount + 1) * itemSize}px` }}
			>
				{generateCurrentChildren()}
			</div>
		</div>
	);
};

export default VirtualizedList;
