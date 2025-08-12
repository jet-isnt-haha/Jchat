import { useNavigate } from 'react-router-dom';
import styles from '../pages/index.module.less';
import { useSessionId } from '@/hooks/useSessionId';
import { useHistorySearch } from '@/hooks/useHistorySearch';
import { useAppConfig, useTexts } from '@/hooks/useConfig';

const HistoryHeader = () => {
	const navigate = useNavigate();
	const { sessionId } = useSessionId();
	const { debounceSearchChange } = useHistorySearch();
	const { placeholders } = useTexts();
	const { routes } = useAppConfig();
	return (
		<header className={styles.header}>
			<div className={styles.searchWrapper}>
				<input
					type="text"
					placeholder={placeholders.searchInput}
					onChange={debounceSearchChange}
				/>
				<span
					onClick={() => {
						navigate(`${routes.home}/${sessionId ?? ''}`);
					}}
					className={styles.arrow}
				/>
			</div>
		</header>
	);
};

export default HistoryHeader;
