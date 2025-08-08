import { useChatStore } from '@/store/chatStore';
import '../styles/global.css';
import ChatSession from './ChatSession';
import { useRowVirtualizer } from '@/hooks/useRowVirtualizer';

const HistoryBody = () => {
	const { sessions: chatSessions, searchedSessions } = useChatStore();
	const { rowVirtualizer, parentRef } = useRowVirtualizer({
		count: chatSessions.length,
		estimateSize: 50
	});
	return (
		<main
			className="history-body"
			ref={parentRef}
			style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
		>
			{!searchedSessions || searchedSessions.length ? (
				rowVirtualizer.getVirtualItems().map((virtualItem) => {
					const session = searchedSessions
						? searchedSessions[virtualItem.index]
						: chatSessions[virtualItem.index];
					return (
						<ChatSession
							session={session}
							style={{
								height: `${virtualItem.size}px`,
								transform: `translateY(${virtualItem.start}px)`
							}}
							key={virtualItem.key}
						/>
					);
				})
			) : (
				<>未找到结果</>
			)}
		</main>
	);
};

export default HistoryBody;
