import styles from './index.module.less';
import HomeFooter from '@/components/home/HomeFooter';
import HomeHeader from '@/components/home/HomeHeader';
import ChatBody from '@/components/home/ChatBody';
import './index.module.less';
import { useSessionManager } from '@/hooks/home/useSessionManager';

const Home = () => {
	const { chatMessages } = useSessionManager();

	return (
		<section className={styles.home}>
			<HomeHeader />
			<ChatBody chatMessages={chatMessages} />
			<HomeFooter />
		</section>
	);
};
export default Home;
