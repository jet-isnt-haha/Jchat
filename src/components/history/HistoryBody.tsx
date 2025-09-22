import ChatSession from './ChatSession';
import SessionModal from './SessionModal';
import { useShowModal } from '@/hooks/useShowModal';
import { useTexts } from '@/hooks/useConfig';
import { useChatStore } from '@/store';
import { useTouchController } from '@/hooks/useTouchController';
import VirtualizedList from '../common/VirtualizedList';
import { useCallback } from 'react';

const HistoryBody = () => {
	const { sessions: chatSessions, searchedSessions } = useChatStore();
	const { messages } = useTexts();
	const sessionList = searchedSessions || chatSessions;
	const { showModal, closeModal, selectedId, openModal } = useShowModal();
	const { handleTouchEnd, handleTouchStart, handleTouchMove } =
		useTouchController();
	const Row = useCallback(
		({ style, index }: { style: React.CSSProperties; index: number }) => {
			const session = sessionList[index];
			return (
				<ChatSession
					style={style}
					session={session}
					key={session.id}
					onTouchStart={handleTouchStart(() => {
						openModal(session.id);
					})}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					onMoreClick={() => {
						openModal(session.id);
					}}
				/>
			);
		},
		[sessionList, handleTouchStart, handleTouchMove, handleTouchEnd, openModal]
	);
	return (
		<main className="history-body min-h-screen overflow-hidden">
			{sessionList.length > 0 ? (
				<VirtualizedList
					itemCount={sessionList.length}
					itemSize={60}
					height={667}
					overscan={2}
					itemKey={(i) => sessionList[i].id}
				>
					{Row}
				</VirtualizedList>
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
