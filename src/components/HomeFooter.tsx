import { useChatSubmit } from '@/hooks/useChatSubmit';
import '../styles/global.css';

const HomeFooter = () => {
	const { inputRef, handleFormSubmit } = useChatSubmit();

	return (
		<div className="chat-footer">
			<form action="#" className="chat-form" onSubmit={handleFormSubmit}>
				<input
					type="text"
					placeholder="message..."
					className="message-input"
					ref={inputRef}
				/>
				<button className={`material-symbols-outlined`}>arrow_upward</button>
			</form>
		</div>
	);
};

export default HomeFooter;
