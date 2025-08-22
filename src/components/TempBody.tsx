import { useChatStore } from '@/store';
import type { Message } from '~/packages/types/chatType';
import MessageBar from './common/MessageBar';
import { useTexts } from '@/hooks/useConfig';

const TempBody = () => {
	const { role } = useTexts();
	const tempSession = useChatStore((state) => state.tempSession);
	const messages = tempSession?.messages;
	console.log(messages);
	return (
		<div
			className="temp-body flex flex-col w-full  rounded-md  
           min-h-[0px] max-h-[400px] transition-all duration-300 
           overflow-y-auto "
		>
			{messages?.map((msg: Message, index) => {
				return (
					<div
						className={`temp-${msg.role === role.model ? role.model : role.user}-message ${msg.isError ? 'error' : ''}`}
					>
						<MessageBar msg={msg} key={index} />
					</div>
				);
			})}
		</div>
	);
};

export default TempBody;
