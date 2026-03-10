import HomeFooter from './components/HomeFooter';
import { useSessionManager } from './hooks/useSessionManager';
import HomeHeader from './components/HomeHeader';
import ChatBody from './components/ChatBody';

const Home = () => {
	const { chatMessages } = useSessionManager();

	return (
		<section className="w-[40vw] h-dvh flex flex-col bg-white overflow-hidden relative justify-self-center border border-solid border-[#6d4fc2] max-md:w-screen max-md:h-svh supports-[-webkit-touch-callout]:h-[-webkit-fill-available]">
			<HomeHeader />
			<ChatBody chatMessages={chatMessages} />
			<HomeFooter />
		</section>
	);
};
export default Home;
