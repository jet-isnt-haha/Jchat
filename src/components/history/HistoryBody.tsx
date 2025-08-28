import ChatSession from './ChatSession';
import { useRowVirtualizer } from '@/hooks/common/useRowVirtualizer';
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
	const sessionList = searchedSessions || chatSessions;
	const { showModal, closeModal, selectedId, openModal } = useShowModal();
	const { handleTouchEnd, handleTouchStart, handleTouchMove } =
		useTouchController();

	return (
		<main
			className="history-body"
			ref={parentRef}
			style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
		>
			{sessionList.length > 0 ? (
				rowVirtualizer.getVirtualItems().map((virtualItem) => {
					if (
						virtualItem.index < 0 ||
						virtualItem.index >= sessionList.length
					) {
						return null;
					}

					const session = sessionList[virtualItem.index];

					// 只在session有效时渲染组件
					if (!session) {
						return null;
					}

					return (
						<ChatSession
							session={session}
							style={{
								height: `${virtualItem.size}px`,
								transform: `translateY(${virtualItem.start}px)`
							}}
							key={virtualItem.key}
							onTouchStart={handleTouchStart(() => {
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
