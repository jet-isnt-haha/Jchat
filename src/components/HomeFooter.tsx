import { useChatStore } from '@/store/chatStore';
import { useRef } from 'react';
import '../styles/global.css';
const HomeFooter = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const chatStore = useChatStore();

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//获得用户输入的信息
		if (inputRef.current?.value) {
			const userMessage = inputRef.current.value;
			chatStore.addMessage({
				content: userMessage,
				role: 'user'
			});
			inputRef.current.value = '';
		}
	};
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
