import styles from './index.module.less';
import HomeFooter from '@/components/HomeFooter';
import HomeHeader from '@/components/HomeHeader';
import ChatBody from '@/components/ChatBody';
import './index.module.less';
import { useSessionManager } from '@/hooks/useSessionManager';
const Home = () => {
	useSessionManager();
	return (
		<section className={styles.home}>
			<HomeHeader />
			<ChatBody />
			<HomeFooter />
		</section>
	);
};
export default Home;
