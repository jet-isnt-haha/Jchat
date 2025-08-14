import { useNavigate } from 'react-router-dom';

import { useHistorySearch } from '@/hooks/useHistorySearch';
import { useAppConfig, useTexts } from '@/hooks/useConfig';
import { useChatStore } from '@/store/chatStore';
import IconButton from './common/IconButton';

const HistoryHeader = () => {
	const navigate = useNavigate();
	const sessionId = useChatStore((state) => state.currentSessionId);
	const { debounceSearchChange } = useHistorySearch();
	const { placeholders, icons } = useTexts();
	const { routes } = useAppConfig();
	return (
		<header className="history-header">
			<div className="history-searchWrapper">
				<input
					type="text"
					placeholder={placeholders.searchInput}
					onChange={debounceSearchChange}
				/>
				<IconButton
					className={icons.back}
					onClick={() => {
						navigate(`${routes.home}/${sessionId ?? ''}`);
					}}
				/>
			</div>
		</header>
	);
};

export default HistoryHeader;
