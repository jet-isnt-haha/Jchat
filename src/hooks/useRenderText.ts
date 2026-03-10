import { useCallback } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const useRenderText = () => {
	const renderingSummary = useCallback(
		async (content: string): Promise<string> => {
			// 将 Markdown 转换为 HTML
			const rawHtml = await marked.parse(content);
			// 清理 HTML 防止 XSS
			const cleanHtml = DOMPurify.sanitize(rawHtml);
			return cleanHtml;
		},
		[]
	);

	return { renderingSummary };
};
