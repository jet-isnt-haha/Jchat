import { useNavigate } from 'react-router-dom';
import { useHistorySearch } from '../hooks/useHistorySearch';
import { useAppConfig, useTexts } from '@/hooks/useConfig';
import IconButton from '@/components/ui/IconButton';
import { useChatStore } from '@/store';

const HistoryHeader = () => {
	const navigate = useNavigate();
	const sessionId = useChatStore((state) => state.currentSessionId);
	const { debounceSearchChange } = useHistorySearch();
	const { placeholders, icons } = useTexts();
	const { routes } = useAppConfig();
	return (
		<header className="py-3 px-4 bg-[#6d4fc2] border-b border-gray-200">
			<div className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
				<input
					type="text"
					placeholder={placeholders.searchInput}
					className="border-none bg-transparent flex-1 text-sm outline-none"
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
