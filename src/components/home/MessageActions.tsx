import { useReducer } from 'react';
import ConfirmDialog from '../common/ConfirmDialog';
import IconButton from '../common/IconButton';
import { useModals, useTexts } from '@/hooks/useConfig';
import { useChatStore } from '@/store';
import type { ConfirmConfig } from '~/packages/types/chatType';

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
	return (
		<>
			<div className="message-actions">
				<IconButton className={icons.copy} onClick={onCopy} />
				<IconButton
					className={icons.delete}
					danger={true}
					onClick={() => {
						dispatch({ type: 'delete' });
					}}
				/>
				<IconButton className={icons.star} onClick={onFavor} />
				<IconButton className={icons.share} onClick={onShare} />
				{getCurrentMessages().at(-1)!.id === MessageId && (
					<>
						<IconButton className={icons.refresh} onClick={onRefresh} />
						<IconButton
							className={icons.branch}
							onClick={() => {
								dispatch({ type: 'branch' });
							}}
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
