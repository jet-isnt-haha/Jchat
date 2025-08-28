import HistoryHeader from '@/components/history/HistoryHeader';
import styles from './index.module.less';
import HistoryBody from '@/components/history/HistoryBody';
import HistoryFooter from '@/components/history/HistoryFooter';
const History = () => {
	return (
		<section className={styles.history}>
			<HistoryHeader />
			<HistoryBody />
			<HistoryFooter />
		</section>
	);
};

export default History;
