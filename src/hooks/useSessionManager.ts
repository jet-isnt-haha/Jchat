import { useChatStore } from '@/store/chatStore';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useSessionManager = () => {
	const { id } = useParams();
	const { setCurrentSessionId, getCurrentMessages } = useChatStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			setCurrentSessionId(id);
			if (!getCurrentMessages()) {
				navigate('/');
			}
		}
	}, [id]);
};
