import debounce from '@/utils/debounce';
import { useCallback, useEffect } from 'react';
import { useAppConfig } from '../useConfig';
import { useChatStore } from '@/store';

export const useHistorySearch = () => {
	const setSearchSessions = useChatStore((state) => state.setSearchSessions);
	const { search } = useAppConfig();

	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const keywords = e.target.value;
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
