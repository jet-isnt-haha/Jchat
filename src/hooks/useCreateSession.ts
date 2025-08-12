import { useChatStore } from '@/store/chatStore';
import { useNavigate } from 'react-router-dom';
import { useAppConfig } from './useConfig';

export const useCreateSession = () => {
	const navigate = useNavigate();
	const _createSession = useChatStore((state) => state.createSession);
	const { routes } = useAppConfig();

	const createSession = () => {
		const newSessionId = _createSession();
		navigate(`${routes.home}/${newSessionId}`, { replace: true });
	};
	return { createSession };
};
