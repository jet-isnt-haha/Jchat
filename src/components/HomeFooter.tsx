import { useChatSubmit } from '@/hooks/useChatSubmit';
import '../styles/global.css';
import { useTexts } from '@/hooks/useConfig';

const HomeFooter = () => {
	const { inputRef, handleFormSubmit, isLoading } = useChatSubmit();
	const { placeholders, icons } = useTexts();
	return (
		<div className="chat-footer">
			<form action="#" className="chat-form" onSubmit={handleFormSubmit}>
				<input
					type="text"
					placeholder={placeholders.messageInput}
					className="message-input"
					ref={inputRef}
				/>
				<button
					className={`material-symbols-outlined ${isLoading && 'loading'}`}
				>
					{isLoading ? icons.stop : icons.send}
				</button>
			</form>
		</div>
	);
};

export default HomeFooter;
