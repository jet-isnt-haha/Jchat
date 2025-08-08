import { useChatStore } from '@/store/chatStore';
import debounce from '@/utils/debounce';
import { useCallback, useEffect } from 'react';

export const useHistorySearch = () => {
	const { setSearchSessions } = useChatStore();
	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const keywords = e.target.value;
			console.log(keywords);
			setSearchSessions(keywords);
		},
		[setSearchSessions]
	);
	const debounceSearchChange = debounce(handleSearchChange, 400);
	useEffect(() => {
		return () => debounceSearchChange.cancel();
	}, [debounceSearchChange]);
	return {
		debounceSearchChange
	};
};
