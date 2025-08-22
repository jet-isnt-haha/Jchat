import { useChatSubmit } from '@/hooks/useChatSubmit';
import IconButton from './common/IconButton';
import { useTexts } from '@/hooks/useConfig';
import TempBody from './TempBody';
import { useChatStore } from '@/store';

const TempModeBar = () => {
	const { inputRef, handleFormSubmit, isLoading } = useChatSubmit();
	const { icons } = useTexts();
	const discardTempSession = useChatStore((state) => state.discardTempSession);
	const setChatMode = useChatStore((state) => state.setChatMode);
	return (
		<div className="temp-mode-bar">
			<TempBody />
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
			</form>
		</div>
	);
};

export default TempModeBar;
