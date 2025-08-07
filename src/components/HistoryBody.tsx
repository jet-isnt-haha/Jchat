import { useChatStore } from '@/store/chatStore';
import '../styles/global.css';
import ChatSession from './ChatSession';
import { useRowVirtualizer } from '@/hooks/useRowVirtualizer';

const HistoryBody = () => {
	const chatSessions = useChatStore().sessions;
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
			{rowVirtualizer.getVirtualItems().map((virtualItem) => {
				const session = chatSessions[virtualItem.index];

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
			})}
		</main>
	);
};

export default HistoryBody;
