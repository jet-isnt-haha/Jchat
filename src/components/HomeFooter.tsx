import { useChatSubmit } from '@/hooks/useChatSubmit';
import '../styles/global.css';
import { useTexts } from '@/hooks/useConfig';
import IconButton from './common/IconButton';

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
				<IconButton
					className={isLoading ? icons.stop : icons.send}
					isLoading={isLoading}
				/>
			</form>
		</div>
	);
};

export default HomeFooter;
