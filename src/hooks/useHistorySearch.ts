import { useChatStore } from '@/store/chatStore';
import debounce from '@/utils/debounce';
import { useCallback, useEffect } from 'react';
import { useAppConfig } from './useConfig';

export const useHistorySearch = () => {
	const { setSearchSessions } = useChatStore();
	const { search } = useAppConfig();

	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const keywords = e.target.value;
			console.log(keywords);
			setSearchSessions(keywords);
		},
		[setSearchSessions]
	);
	const debounceSearchChange = debounce(
		handleSearchChange,
		search.debounceDelay
	);
	useEffect(() => {
		return () => debounceSearchChange.cancel();
	}, [debounceSearchChange]);
	return {
		debounceSearchChange
	};
};
