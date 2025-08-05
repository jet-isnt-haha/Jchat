import styles from '../pages/index.module.less';

const HistoryHeader = () => {
	return (
		<header className={styles.header}>
			<div className={styles.searchWrapper}>
				<input type="text" placeholder="Search Grok History" />
				<span className={styles.arrow} />
			</div>
		</header>
	);
};

export default HistoryHeader;
