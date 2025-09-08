import { useNavigate } from 'react-router-dom';
import { useAppConfig } from './useConfig';
import { useChatStore } from '@/store';

export const useCreateSession = () => {
	const navigate = useNavigate();
	const _createSession = useChatStore((state) => state.createSession);
	const setCurrentSessionId = useChatStore(
		(state) => state.setCurrentSessionId
	);
	const _createTempSession = useChatStore((state) => state.createTempSession);
	const _createChildSession = useChatStore((state) => state.createChildSession);
	const { routes } = useAppConfig();

	const createNewSession = async () => {
		const newSessionId = await _createSession();
		setCurrentSessionId(newSessionId);
		navigate(`${routes.home}/${newSessionId}`, { replace: true });
	};
	const createTempSession = () => {
		_createTempSession();
	};

	const createChildSession = (
		parentId: string,
		parentLastMessageId: string
	) => {
		const childSessionId = _createChildSession(parentId, parentLastMessageId);
		setCurrentSessionId(childSessionId);
		navigate(`${routes.home}/${childSessionId}`, { replace: true });
	};
	return { createNewSession, createTempSession, createChildSession };
};
