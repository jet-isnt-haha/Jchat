import { useChatStore } from '@/store';
import type { Message } from '~/packages/types/chatType';

const TempBody = () => {
	const tempSession = useChatStore((state) => state.tempSession);
	const messages = tempSession?.messages;
	console.log(messages);
	return (
		<div
			className="flex flex-col-reverse  rounded-md p-3 
           min-h-[0px] max-h-[400px] transition-all duration-300 
           overflow-y-auto"
		>
			{messages?.map((msg: Message, index) => {
				return (
					<p key={index} className="flex flex-col space-y-2">
						{msg.content}
					</p>
				);
			})}
		</div>
	);
};

export default TempBody;
