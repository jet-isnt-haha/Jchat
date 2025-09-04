import { useNavigate } from 'react-router-dom';
import { useHistorySearch } from '@/hooks/history/useHistorySearch';
import { useAppConfig, useTexts } from '@/hooks/useConfig';
import IconButton from '../common/IconButton';
import { useChatStore } from '@/store';

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
					styleClass="cursor-pointer hover:opacity-50"
					onClick={() => {
						navigate(`${routes.home}/${sessionId ?? ''}`);
					}}
				/>
			</div>
		</header>
	);
};

export default HistoryHeader;
