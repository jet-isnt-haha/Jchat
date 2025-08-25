import { useBranchCollapse } from '@/hooks/useBranchCollapse';
import { useAppConfig, useTexts } from '@/hooks/useConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChatSession } from '~/packages/types/chatType';
import IconButton from './common/IconButton';

interface BranchCollapseProps {
	session: ChatSession;
}

const BranchCollapse = ({ session }: BranchCollapseProps) => {
	const [showCollapse, setShowCollapse] = useState(false);
	const { icons } = useTexts();
	const distinctColors = [
		'#ff525233', // 亮红（带透明度）
		'#4caf5033', // 亮绿（带透明度）
		'#2196f333', // 亮蓝（带透明度）
		'#ffeb3b33', // 亮黄（带透明度）
		'#9c27b033', // 亮紫（带透明度）
		'#ff980033', // 亮橙（带透明度）
		'#e91e6333', // 粉红（带透明度）
		'#00bcd433', // 青蓝（带透明度）
		'#8bc34a33', // 浅绿（带透明度）
		'#ff572233' // 橙红（带透明度）
	];

	// 计算当前节点的背景色（基于子节点数量）
	const childCount = session.children?.length || 0;
	const colorIndex = childCount % distinctColors.length;
	const bgColor = distinctColors[colorIndex];

	const [modelMessage, currentMessage] = useBranchCollapse(session);
	const { routes } = useAppConfig();
	const navigate = useNavigate();
	return (
		<div className="p-2 overflow-y-auto  scrollbar-thin scrollbar-thumb-[#ddd3f9] scrollbar-track-transparent">
			{/* 1. 展开/折叠控制栏 */}
			<div
				className="flex items-center gap-2 p-2 rounded cursor-pointer transition-all border border-blue-300 hover:bg-gray-50"
				style={{ backgroundColor: bgColor }}
			>
				{session.children.length > 0 && (
					<IconButton
						className={showCollapse ? icons.down : icons.right}
						onClick={() => setShowCollapse((prev) => !prev)}
					/>
				)}
				<div
					className="p-2  bg-gray-50 rounded border border-gray-200 w-full"
					onClick={() => {
						navigate(`${routes.home}/${session.id}`);
					}}
				>
					<span className="text-xs text-blue-500">{session.title}</span>
					{session.children.length > 0 && (
						<span className="text-xs text-green-500">
							（分支数：{session.children.length}）
						</span>
					)}
					{currentMessage && modelMessage && (
						<>
							<p>
								<span className="text-xs  text-green-500">
									{modelMessage.role}：
								</span>
								<span className="text-sm">
									{modelMessage.content.slice(0, 50)}...
								</span>
							</p>
							<p>
								<span className="text-xs text-blue-500">
									{currentMessage.role}：
								</span>
								<span className="text-sm">
									{currentMessage.content.slice(0, 50)}...
								</span>
							</p>
						</>
					)}
				</div>
			</div>

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
