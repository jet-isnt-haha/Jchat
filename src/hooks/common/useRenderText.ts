import { marked } from 'marked';
import DOMPurify from 'dompurify';
import katex from 'katex';
import 'katex/dist/katex.min.css';
/* 
原始文本（含LaTeX和Markdown）
  ↓ 第一步：katex处理
文本中的LaTeX公式 → 转换为带样式的HTML标签
  ↓ 第二步：marked处理
剩余Markdown标记 → 转换为对应HTML标签
  ↓ 第三步：DOMPurify处理
净化HTML（过滤危险内容）
  ↓ 第四步：前端渲染
HTML标签被浏览器解析 → 展示为富文本（公式、加粗、列表等）
*/
export const useRenderText = () => {
	const renderLatex = (text: string) => {
		// 处理 LaTeX 代码块 (用 $$ 包裹)
		text = text.replace(/\$\$([\s\S]+?)\$\$/g, (match, latex) => {
			try {
				return katex.renderToString(latex, {
					displayMode: true,
					throwOnError: false
				});
			} catch (e) {
				console.error('LaTeX error:', e);
				return match;
			}
		});

		// 处理行内 LaTeX (用 $ 包裹)
		text = text.replace(/\$(.+?)\$/g, (match, latex) => {
			try {
				return katex.renderToString(latex, {
					displayMode: false,
					throwOnError: false
				});
			} catch (e) {
				console.error('LaTeX error:', e);
				return match;
			}
		});

		return text;
	};

	const renderingSummary = async (summary: string) => {
		if (!summary) return '';

		// 先处理 Markdown 内容中的 LaTeX 公式
		const processedText = renderLatex(summary);

		// 再将 Markdown 转换为 HTML
		const rawHtml = await marked(processedText);

		// 最后使用 DOMPurify 过滤 HTML
		return DOMPurify.sanitize(rawHtml);
	};

	return { renderingSummary };
};
