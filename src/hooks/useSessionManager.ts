import { useChatStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useSessionManager = () => {
	const { id } = useParams();
	const setCurrentSessionId = useChatStore(
		(state) => state.setCurrentSessionId
	);
	const getCurrentMessages = useChatStore((state) => state.getCurrentMessages);

	//起到订阅作用
	const currentSessionId = useChatStore((state) => state.currentSessionId);
	const sessions = useChatStore((state) => state.sessions);
	const chatMessages = getCurrentMessages();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			// 处理/session/new的情况
			if (id === 'new') {
				// 不设置sessionId，直接导航到/session
				navigate('/session');
				setCurrentSessionId('');
			} else {
				// 正常会话ID，设置当前sessionId
				setCurrentSessionId(id);
			}
		}
	}, [id]);

	return {
		chatMessages,
		sessionId: currentSessionId,
		sessions
	};
};
