import type { ChatSession } from '~/packages/types/chatType';

export const useBranchBar = (session: ChatSession) => {
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

	return { bgColor };
};
