import { useChatStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppConfig } from '../useConfig';

export const useSessionManager = () => {
	const { id } = useParams();
	const { routes } = useAppConfig();
	const {
		setCurrentSessionId,
		getCurrentMessages,
		sessions,
		currentSessionId,
		findSessionById,
		hydrateSessionData
	} = useChatStore();

	const chatMessages = getCurrentMessages();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			// 处理/session/new的情况
			if (id === 'new') {
				// 不设置sessionId，直接导航到/session
				navigate(routes.home);
				setCurrentSessionId('');
			} else {
				const session = findSessionById(id);
				if (session) {
					setCurrentSessionId(id);
					hydrateSessionData();
				} else {
					// 会话不存在，重定向到首页
					navigate(routes.home);
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
