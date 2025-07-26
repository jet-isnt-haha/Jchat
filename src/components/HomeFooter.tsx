import { useChatStore } from '@/store/chatStore';
import { useRef } from 'react';

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
			console.log(chatStore.currentSessionId);
			console.log(chatStore.session[0].messages);
			console.log(JSON.stringify(chatStore.session[0].messages, null, 2));
		}
	};
	console.log(JSON.stringify(chatStore.session[0].messages, null, 2));
	return (
		<div className="chat-footer absolute bottom-0 w-full px-[22px] pt-[15px] pb-[20px] bg-white">
			<form
				action="#"
				className="chat-form flex items-center bg-white rounded-[32px] outline outline-[#CCCCE5] shadow-[0_0_8px_rgba(0,0,0,0.06)]"
				onSubmit={handleFormSubmit}
			>
				<input
					type="text"
					placeholder="message..."
					className="message-input border-none outline-none bg-transparent w-full h-[47px] px-[17px] text-[0.95rem]"
					ref={inputRef}
				/>
				<button
					className={`material-symbols-outlined  h-8.5 w-8.5 rounded-full bg-[#6D4FC2] text-white text-[1.15rem] mr-1.5 cursor-pointer transition-all duration-200 ease-in-out border-none outline-none flex-shrink-0 hidden`}
				>
					arrow_upward
				</button>
			</form>
		</div>
	);
};

export default HomeFooter;
