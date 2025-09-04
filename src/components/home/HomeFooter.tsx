import { useChatSubmit } from '@/hooks/useChatSubmit';
import { useAppConfig, useTexts } from '@/hooks/useConfig';
import IconButton from '../common/IconButton';
import { useChatStore } from '@/store';

const HomeFooter = () => {
	const { inputRef, handleFormSubmit, isLoading } = useChatSubmit();
	const { placeholders, icons } = useTexts();
	const { chatMode } = useAppConfig();
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
					styleClass="cursor-pointer hover:opacity-80"
					onClick={() => {
						if (!isLoading) {
							setChatMode(chatMode.normal);
						}
					}}
				/>
			</form>
		</div>
	);
};

export default HomeFooter;
