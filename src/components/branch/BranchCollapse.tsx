import { useBranchCollapse } from '@/hooks/branch/useBranchCollapse';
import { useAppConfig } from '@/hooks/useConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChatSession } from '~/packages/types/chatType';
import BranchBar from './BranchBar';

interface BranchCollapseProps {
	session: ChatSession;
}

const BranchCollapse = ({ session }: BranchCollapseProps) => {
	const [showCollapse, setShowCollapse] = useState(false);
	const [modelMessage, currentMessage] = useBranchCollapse(session);
	const { routes } = useAppConfig();
	const navigate = useNavigate();
	return (
		<div className="p-2 overflow-y-auto  scrollbar-thin scrollbar-thumb-[#ddd3f9] scrollbar-track-transparent">
			<BranchBar
				currentMessage={currentMessage}
				modelMessage={modelMessage}
				handleButton={() => setShowCollapse((prev) => !prev)}
				handleContent={() => {
					navigate(`${routes.home}/${session.id}`);
				}}
				session={session}
				showState={showCollapse}
			/>
			{showCollapse && (
				<div>
					{session.children && session.children.length > 0 && (
						<div>
							{session.children.map((child) => (
								<BranchCollapse key={child.id} session={child} />
							))}
						</div>
					)}
					{!currentMessage &&
						(!session.children || session.children.length === 0) && (
							<div className="p-2 text-xs text-gray-400">无分支消息</div>
						)}
				</div>
			)}
		</div>
	);
};

export default BranchCollapse;
