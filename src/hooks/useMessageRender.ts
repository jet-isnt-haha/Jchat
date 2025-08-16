import { useEffect, useState } from 'react';
import { useRenderText } from './common/useRenderText';
import type { Message } from '~/packages/types/chatType';

export const useMessageRender = (
	content: Message['content'],
	role: Message['role']
) => {
	const { renderingSummary } = useRenderText();

	const [renderedMessage, setRenderedMessage] = useState<string>('');

	useEffect(() => {
		//防内存泄漏.专门用于 异步操作与组件生命周期不同步 的场景
		let isMounted = true;
		renderingSummary(content).then((value: string) => {
			if (isMounted) setRenderedMessage(value);
		});
		return () => {
			isMounted = false;
		};
	}, [content, renderingSummary]);

	return role !== 'model' ? [content] : [renderedMessage];
};
