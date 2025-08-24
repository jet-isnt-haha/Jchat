import { useChatStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useSessionManager = () => {
	const { id } = useParams();
	const {
		setCurrentSessionId,
		getCurrentMessages,
		sessions,
		currentSessionId,
		findSessionById
	} = useChatStore();

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
				const session = findSessionById(id);
				if (session) {
					setCurrentSessionId(id);
				} else {
					// 会话不存在，重定向到首页
					navigate('/session');
				}
			}
		}
	}, [id]);

	return {
		chatMessages,
		sessionId: currentSessionId,
		sessions
	};
};
