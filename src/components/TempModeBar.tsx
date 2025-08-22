import { useChatSubmit } from '@/hooks/useChatSubmit';
import IconButton from './common/IconButton';
import { useTexts } from '@/hooks/useConfig';
import TempBody from './TempBody';
import { useChatStore } from '@/store';
import ConfirmDialog from './common/ConfirmDialog';
import { useState } from 'react';

const TempModeBar = () => {
	const [showConfirm, setShowConfirm] = useState(false);

	const { inputRef, handleFormSubmit, isLoading } = useChatSubmit();
	const { icons } = useTexts();
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
						setChatMode('temp');
					}}
				/>
				<IconButton className={'close'} onClick={() => discardTempSession()} />
				<IconButton
					className={'save'}
					onClick={() => {
						setShowConfirm(true);
					}}
					disabled={isLoading || messages.length === 0}
				/>
			</form>
			<ConfirmDialog
				isOpen={showConfirm}
				title={'保存会话'}
				message={'确定保存这个会话吗？'}
				onConfirm={() => {
					saveTempSession();
					discardTempSession();
					setShowConfirm(false);
				}}
				onCancel={() => setShowConfirm(false)}
				confirmText={'保存'}
				cancelText={'取消'}
			/>
		</div>
	);
};

export default TempModeBar;
