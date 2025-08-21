import { useNavigate } from 'react-router-dom';
import { useAppConfig } from './useConfig';
import { useChatStore } from '@/store';

export const useCreateSession = () => {
	const navigate = useNavigate();
	const _createSession = useChatStore((state) => state.createSession);
	const _createTempSession = useChatStore((state) => state.createTempSession);
	const { routes } = useAppConfig();

	const createNewSession = () => {
		const newSessionId = _createSession();
		navigate(`${routes.home}/${newSessionId}`, { replace: true });
	};
	const createTempSession = () => {
		_createTempSession();
	};
	return { createNewSession, createTempSession };
};
