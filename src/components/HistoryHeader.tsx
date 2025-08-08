import { useNavigate } from 'react-router-dom';
import styles from '../pages/index.module.less';
import { useSessionId } from '@/hooks/useSessionId';
import { useHistorySearch } from '@/hooks/useHistorySearch';

const HistoryHeader = () => {
	const navigate = useNavigate();
	const { sessionId } = useSessionId();
	const { debounceSearchChange } = useHistorySearch();

	return (
		<header className={styles.header}>
			<div className={styles.searchWrapper}>
				<input
					type="text"
					placeholder="Search Grok History"
					onChange={debounceSearchChange}
				/>
				<span
					onClick={() => {
						navigate(`/session/${sessionId}`);
					}}
					className={styles.arrow}
				/>
			</div>
		</header>
	);
};

export default HistoryHeader;
