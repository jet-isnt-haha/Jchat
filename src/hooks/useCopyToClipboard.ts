import { useState } from 'react';

export const useCopyToClipboard = () => {
	const [copied, setCopied] = useState(false);

	//复制文本到剪贴板
	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			//2秒后重置状态
			setTimeout(() => setCopied(false), 2000);
			return true;
		} catch (error) {
			console.log('复制失败', error);
			return false;
		}
	};

	return { copied, copyToClipboard };
};
