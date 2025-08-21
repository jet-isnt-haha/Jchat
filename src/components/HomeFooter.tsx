import { useChatSubmit } from '@/hooks/useChatSubmit';
import '../styles/global.css';
import { useTexts } from '@/hooks/useConfig';
import IconButton from './common/IconButton';
import { useChatStore } from '@/store';

const HomeFooter = () => {
	const { inputRef, handleFormSubmit, isLoading } = useChatSubmit();
	const { placeholders, icons } = useTexts();
	const setChatMode = useChatStore((state) => state.setChatMode);
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
					type="submit"
					className={isLoading ? icons.stop : icons.send}
					isLoading={isLoading}
					onClick={() => {
						setChatMode('normal');
					}}
				/>
			</form>
		</div>
	);
};

export default HomeFooter;
