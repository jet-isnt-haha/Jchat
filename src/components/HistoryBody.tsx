import styles from '../pages/index.module.less';
const HistoryBody = () => {
	return (
		<main className={styles.body}>
			{/* 以下是历史记录条目，可以根据实际数据动态渲染 */}
			<div className={styles.emptyState}>
				<p className={styles.statusText}>Unable to load</p>
				<p className={styles.statusHint}>Please try again later</p>
			</div>
		</main>
	);
};

export default HistoryBody;
