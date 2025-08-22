import type { Message } from '~/packages/types/chatType';
import MessageBar from './common/MessageBar';
import { useTexts } from '@/hooks/useConfig';

interface TempBodyProps {
	chatMessages: Message[];
}

const TempBody = ({ chatMessages }: TempBodyProps) => {
	const { role } = useTexts();

	return (
		<div className="temp-body">
			{chatMessages?.map((msg: Message, index) => {
				return (
					<div
						className={`temp-message ${msg.role === role.model ? role.model : role.user}-message ${msg.isError ? 'error' : ''}`}
						key={index}
					>
						<MessageBar msg={msg} />
					</div>
				);
			})}
		</div>
	);
};

export default TempBody;
