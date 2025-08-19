import { useChatSubmit } from '@/hooks/useChatSubmit';
import IconButton from './common/IconButton';
import { useTexts } from '@/hooks/useConfig';
import TempBody from './TempBody';
import { useChatStore } from '@/store';

const TempModeBar = () => {
	const { inputRef, handleFormSubmit, isLoading } = useChatSubmit();
	const { icons } = useTexts();
	const discardTempSession = useChatStore((state) => state.discardTempSession);
	return (
		<div className="temp-mode-bar ">
			<TempBody />
			<form action="#" className="temp-form" onSubmit={handleFormSubmit}>
				<input ref={inputRef} type="text" placeholder="在上下文中询问或编辑" />
				<IconButton
					className={isLoading ? icons.stop : icons.send}
					isLoading={isLoading}
				/>
				<IconButton className={'close'} onClick={() => discardTempSession()} />
			</form>
		</div>
	);
};

export default TempModeBar;
