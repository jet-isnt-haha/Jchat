import { useChatSubmit } from '@/hooks/useChatSubmit';
import IconButton from './common/IconButton';
import { useAppConfig, useModals, useTexts } from '@/hooks/useConfig';
import TempBody from './TempBody';
import { useChatStore } from '@/store';
import ConfirmDialog from './common/ConfirmDialog';
import { useState } from 'react';

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
		<div className="temp-mode-bar">
			<TempBody chatMessages={messages} />
			<form action="#" className="temp-form " onSubmit={handleFormSubmit}>
				<input ref={inputRef} type="text" placeholder="ask in context" />
				<IconButton
					type="submit"
					className={isLoading ? icons.stop : icons.send}
					isLoading={isLoading}
					onClick={() => {
						setChatMode(chatMode.temp);
					}}
				/>
				<IconButton
					className={icons.close}
					onClick={() => discardTempSession()}
				/>
				<IconButton
					className={icons.save}
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
