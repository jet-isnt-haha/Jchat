const HomeFooter = () => {
	return (
		<div className="chat-footer absolute bottom-0 w-full px-[22px] pt-[15px] pb-[20px] bg-white">
			<form
				action="#"
				className="chat-form flex items-center bg-white rounded-[32px] outline outline-[#CCCCE5] shadow-[0_0_8px_rgba(0,0,0,0.06)]"
			>
				<input
					type="text"
					placeholder="message..."
					className="message-input border-none outline-none bg-transparent w-full h-[47px] px-[17px] text-[0.95rem]"
					disabled
				/>
				<button className={`material-symbols-outlined ${'pause'}`}>
					crop_square
				</button>
			</form>
		</div>
	);
};

export default HomeFooter;
