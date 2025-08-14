import IconButton from './common/IconButton';

interface MessageActionsProps {
	onCopy: () => void;
	onDelete: () => void;
	onFavor: () => void;
	onRefresh: () => void;
	onShare: () => void;
}

const MessageActions = ({
	onCopy,
	onDelete,
	onFavor,
	onRefresh,
	onShare
}: MessageActionsProps) => {
	return (
		<div className="message-actions">
			<IconButton className="content_copy" onClick={onCopy} />
			<IconButton className="delete" danger={true} onClick={onDelete} />
			<IconButton className="cards_star" onClick={onFavor} />
			<IconButton className="refresh" onClick={onRefresh} />
			<IconButton className="share" onClick={onShare} />
		</div>
	);
};

export default MessageActions;
