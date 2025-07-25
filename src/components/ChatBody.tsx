const ChatBody = () => {
	return (
		<main className="chat-body flex flex-col gap-[20px] px-[22px] py-[25px] h-[700px] overflow-y-auto mb-[82px] scrollbar-thin scrollbar-thumb-[#DDD3F9] scrollbar-track-transparent">
			<div className="message bot-message flex items-center gap-[11px]">
				<p className="message-text px-4 py-3 max-w-[75%] break-words whitespace-pre-line text-[0.95rem]">
					Hey,how can i help u
				</p>
			</div>
		</main>
	);
};

export default ChatBody;
