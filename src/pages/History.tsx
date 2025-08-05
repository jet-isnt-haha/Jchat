import HistoryHeader from '@/components/HistoryHeader';
import styles from './index.module.less';
import HistoryBody from '@/components/HistoryBody';
import HistoryFooter from '@/components/HistoryFooter';
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
