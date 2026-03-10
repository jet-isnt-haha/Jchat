import { useReducer } from 'react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import IconButton from '@/components/ui/IconButton';
import { useModals, useTexts } from '@/hooks/useConfig';
import { useChatStore } from '@/store';
import type { ConfirmConfig } from '@/types/chatType';

interface MessageActionsProps {
	MessageId: string;
	onCopy: () => void;
	onDelete: () => void;
	onFavor: () => void;
	onRefresh: () => void;
	onShare: () => void;
	onBranch: () => void;
}
interface ConfirmState {
	showConfirm: boolean;
	confirm: ConfirmConfig;
	onSomething: () => void;
}

type ConfirmAction =
	| { type: 'delete' }
	| { type: 'branch' }
	| { type: 'close' };

const MessageActions = ({
	MessageId,
	onCopy,
	onDelete,
	onFavor,
	onRefresh,
	onShare,
	onBranch
}: MessageActionsProps) => {
	const { confirmDelete, confirmBranch } = useModals();
	const todoReducer = (state: ConfirmState, action: ConfirmAction) => {
		switch (action.type) {
			case 'delete':
				return {
					confirm: confirmDelete,
					onSomething: onDelete,
					showConfirm: true
				};
			case 'branch':
				return {
					confirm: confirmBranch,
					onSomething: onBranch,
					showConfirm: true
				};
			case 'close':
				return { ...state, showConfirm: false };
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(todoReducer, {
		confirm: confirmDelete,
		onSomething: onDelete,
		showConfirm: false
	});

	const getCurrentMessages = useChatStore((state) => state.getCurrentMessages);
	const { icons } = useTexts();
	const actionButtonStyle =
		'h-full px-1.5 text-[16px] md:hidden group-hover:md:block hover:md:bg-[#f0f0f0] hover:text-[#6D4FC2] hover:rounded-md hover:scale-105 transition-all duration-200';
	return (
		<>
			<div className="group w-full h-8 px-2 flex mt-1 border-2 border-[#6D4FC2] rounded-md bg-white md:border-0">
				<IconButton
					className={icons.copy}
					onClick={onCopy}
					styleClass={actionButtonStyle}
				/>
				<IconButton
					className={icons.delete}
					danger={true}
					onClick={() => {
						dispatch({ type: 'delete' });
					}}
					styleClass={actionButtonStyle}
				/>
				<IconButton
					className={icons.star}
					onClick={onFavor}
					styleClass={actionButtonStyle}
				/>
				<IconButton
					className={icons.share}
					onClick={onShare}
					styleClass={actionButtonStyle}
				/>
				{getCurrentMessages().at(-1)!.id === MessageId && (
					<>
						<IconButton className={icons.refresh} onClick={onRefresh} />
						<IconButton
							className={icons.branch}
							onClick={() => {
								dispatch({ type: 'branch' });
							}}
							styleClass={actionButtonStyle}
						/>
					</>
				)}
			</div>
			<ConfirmDialog
				isOpen={state.showConfirm}
				title={state.confirm.title}
				message={state.confirm.message}
				onConfirm={() => {
					state.onSomething();
					dispatch({ type: 'close' });
				}}
				onCancel={() => dispatch({ type: 'close' })}
				confirmText={state.confirm.confirmText}
				cancelText={state.confirm.cancelText}
				danger={state.confirm.danger}
			/>
		</>
	);
};

export default MessageActions;
