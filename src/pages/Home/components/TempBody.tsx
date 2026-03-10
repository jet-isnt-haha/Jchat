import type { Message } from '@/types/chatType';
import MessageBar from '@/components/MessageBar';
import { cn } from '@/lib/utils';

interface TempBodyProps {
	chatMessages: Message[];
}

const TempBody = ({ chatMessages }: TempBodyProps) => {
	return (
		<div className="flex flex-col w-full rounded-md min-h-0 max-h-[400px] transition-all duration-300 overflow-y-auto scrollbar-thin scrollbar-thumb-[#ddd3f9] scrollbar-track-transparent">
			{chatMessages?.map((msg: Message, index) => {
				return (
					<div
						className={cn('p-1', msg.role === 'user' && 'text-[#f6f2ff]')}
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
