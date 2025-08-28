import { useAppConfig } from '@/hooks/useConfig';
import styles from '../../pages/index.module.less';
const HistoryFooter = () => {
	const { user } = useAppConfig();
	return (
		<footer className={styles.footer}>
			<span className={styles.userName}>{user.defaultName}</span>
			<span className={styles.settingsIcon} />
		</footer>
	);
};

export default HistoryFooter;
