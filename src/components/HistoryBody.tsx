import '../styles/global.css';
import ChatSession from './ChatSession';
import { useRowVirtualizer } from '@/hooks/useRowVirtualizer';
import SessionModal from './SessionModal';
import { useShowModal } from '@/hooks/useShowModal';
import { useAppConfig, useTexts } from '@/hooks/useConfig';
import { useChatStore } from '@/store';
import { useTouchController } from '@/hooks/useTouchController';

const HistoryBody = () => {
	const { sessions: chatSessions, searchedSessions } = useChatStore();
	const { virtualization } = useAppConfig();
	const { messages } = useTexts();
	const { rowVirtualizer, parentRef } = useRowVirtualizer({
		count: chatSessions.length,
		estimateSize: virtualization.estimatedItemSize
	});

	const { showModal, closeModal, selectedId, openModal } = useShowModal();
	const { handleTouchEnd, handleTouchStart, handleTouchMove } =
		useTouchController();

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
							onTouchStart={handleTouchStart(session.id, () => {
								openModal(session.id);
							})}
							onTouchMove={handleTouchMove}
							onTouchEnd={handleTouchEnd}
						/>
					);
				})
			) : (
				<>{messages.noResults}</>
			)}
			{showModal && (
				<SessionModal closeModal={closeModal} sessionId={selectedId} />
			)}
		</main>
	);
};

export default HistoryBody;
