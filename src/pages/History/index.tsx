import HistoryHeader from './components/HistoryHeader';
import HistoryBody from './components/HistoryBody';
import HistoryFooter from './components/HistoryFooter';
const History = () => {
	return (
		<section className="w-[40vw] h-dvh flex flex-col bg-[#f9f9f9] overflow-hidden relative font-sans max-md:w-screen max-md:h-svh">
			<HistoryHeader />
			<HistoryBody />
			<HistoryFooter />
		</section>
	);
};

export default History;
