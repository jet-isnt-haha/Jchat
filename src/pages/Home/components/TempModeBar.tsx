import { useChatSubmit } from '@/hooks/useChatSubmit';
import IconButton from '@/components/ui/IconButton';
import { useAppConfig, useModals, useTexts } from '@/hooks/useConfig';
import TempBody from './TempBody';
import { useChatStore } from '@/store';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { useState } from 'react';

const tempButtonStyle =
	'h-8.5 w-8.5 mx-0.5 aspect-square rounded-full bg-[#6D4FC2] text-white text-[1.15rem] cursor-pointer transition-all duration-200 ease-in-out border-none outline-none';

const TempModeBar = () => {
	const [showConfirm, setShowConfirm] = useState(false);

	const { inputRef, handleFormSubmit, isLoading } = useChatSubmit();
	const { icons } = useTexts();
	const { confirmSave } = useModals();
	const { chatMode } = useAppConfig();
	const { discardTempSession, tempSession, setChatMode, saveTempSession } =
		useChatStore();
	const messages = tempSession?.messages ?? [];
	return (
		<div
			className="w-4/5 bottom-30 border-3 rounded-[10px] border-indigo-300 mt-2 pr-4 pl-2 py-1 absolute"
			style={{ background: 'linear-gradient(to right, #6d4fc2, #f6f2ff)' }}
		>
			<TempBody chatMessages={messages} />
			<form
				action="#"
				className="flex items-center bg-white rounded-[32px] outline outline-[#CCCCE5] shadow-[0_0_8px_rgba(0,0,0,0.06)]"
				onSubmit={handleFormSubmit}
			>
				<textarea
					rows={1}
					ref={inputRef}
					placeholder="ask in context"
					className="border-none outline-none bg-transparent w-full py-[10px] px-[17px] text-[0.95rem] overflow-y-auto resize-none min-h-[47px] h-auto max-h-[100px] scrollbar-thin scrollbar-thumb-[#ddd3f9] scrollbar-track-transparent"
					onChange={(e) => {
						e.target.style.height = 'auto';
						e.target.style.height = e.target.scrollHeight + 'px';
					}}
				/>
				<IconButton
					type="submit"
					className={isLoading ? icons.stop : icons.send}
					styleClass={tempButtonStyle}
					isLoading={isLoading}
					onClick={() => {
						if (!isLoading) {
							setChatMode(chatMode.temp);
						}
					}}
				/>
				<IconButton
					className={icons.close}
					styleClass={tempButtonStyle}
					onClick={() => discardTempSession()}
				/>
				<IconButton
					className={icons.save}
					styleClass={tempButtonStyle}
					onClick={() => {
						setShowConfirm(true);
					}}
					disabled={isLoading || messages.length === 0}
				/>
			</form>
			<ConfirmDialog
				isOpen={showConfirm}
				title={confirmSave.title}
				message={confirmSave.message}
				onConfirm={() => {
					saveTempSession();
					discardTempSession();
					setShowConfirm(false);
				}}
				onCancel={() => setShowConfirm(false)}
				confirmText={confirmSave.confirmText}
				cancelText={confirmSave.cancelText}
			/>
		</div>
	);
};

export default TempModeBar;
