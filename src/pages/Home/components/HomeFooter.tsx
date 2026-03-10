import { useChatSubmit } from '../../../hooks/useChatSubmit';
import { useAppConfig, useTexts } from '@/hooks/useConfig';
import IconButton from '@/components/ui/IconButton';
import { useChatStore } from '@/store';

const HomeFooter = () => {
	const { inputRef, handleFormSubmit, isLoading } = useChatSubmit();
	const { placeholders, icons } = useTexts();
	const { chatMode } = useAppConfig();
	const setChatMode = useChatStore((state) => state.setChatMode);

	return (
		<div className="absolute bottom-0 w-full px-[22px] pt-[15px] pb-[20px] bg-white">
			<form
				action="#"
				className="flex items-center bg-white rounded-[32px] outline outline-[#CCCCE5] shadow-[0_0_8px_rgba(0,0,0,0.06)]"
				onSubmit={handleFormSubmit}
			>
				<textarea
					rows={1}
					placeholder={placeholders.messageInput}
					className="border-none outline-none bg-transparent w-full py-[10px] px-[17px] text-[0.95rem] overflow-y-auto resize-none min-h-[47px] h-auto max-h-[150px] scrollbar-thin scrollbar-thumb-[#ddd3f9] scrollbar-track-transparent"
					ref={inputRef}
				/>
				<IconButton
					type="submit"
					className={isLoading ? icons.stop : icons.send}
					isLoading={isLoading}
					styleClass="h-8.5 w-8.5 rounded-full bg-[#6D4FC2] text-white text-[1.15rem] mr-1.5 transition-all duration-200 ease-in-out border-none outline-none flex-shrink-0 cursor-pointer hover:opacity-80"
					onClick={() => {
						if (!isLoading) setChatMode(chatMode.normal);
					}}
				/>
			</form>
		</div>
	);
};

export default HomeFooter;
