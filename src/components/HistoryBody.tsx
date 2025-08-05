import { useChatStore } from '@/store/chatStore';
import '../styles/global.css';
import ChatSession from './ChatSession';

const HistoryBody = () => {
	const chatSessions = useChatStore().sessions;
	return (
		<main className="history-body">
			{chatSessions.map((session, index) => (
				<ChatSession {...session} key={index} />
			))}
		</main>
	);
};

export default HistoryBody;
