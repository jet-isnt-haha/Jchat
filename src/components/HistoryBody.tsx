import { useChatStore } from '@/store/chatStore';
import '../styles/global.css';
import ChatSession from './ChatSession';
import { useRowVirtualizer } from '@/hooks/useRowVirtualizer';
import SessionModal from './SessionModal';
import { useShowModal } from '@/hooks/useShowModal';

const HistoryBody = () => {
	const { sessions: chatSessions, searchedSessions } = useChatStore();

	const { rowVirtualizer, parentRef } = useRowVirtualizer({
		count: chatSessions.length,
		estimateSize: 50
	});

	const {
		showModal,
		handleTouchEnd,
		handleTouchStart,
		handleTouchMove,
		closeModal,
		selectedId
	} = useShowModal();
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
							onTouchStart={handleTouchStart(session.id)}
							onTouchMove={handleTouchMove}
							onTouchEnd={handleTouchEnd}
						/>
					);
				})
			) : (
				<>未找到结果</>
			)}
			{showModal && (
				<SessionModal closeModal={closeModal} sessionId={selectedId} />
			)}
		</main>
	);
};

export default HistoryBody;
