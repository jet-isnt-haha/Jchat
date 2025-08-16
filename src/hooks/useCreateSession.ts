import { useNavigate } from 'react-router-dom';
import { useAppConfig } from './useConfig';
import { useChatStore } from '@/store';

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
