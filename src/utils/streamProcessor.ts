//处理大模型流式信息的工具

export default async function streamProcessor(
	response: Response,
	onDelta: (deltaText: string) => void
) {
	const reader = response.body?.getReader();
	const decoder = new TextDecoder();

	if (!reader) return;

	let accumulatedText = '';

	while (true) {
		const { value, done } = await reader.read();

		if (done) break;

		const result = decoder.decode(value, { stream: true });
		if (result.toString().includes('"finish_reason":"stop"')) break;

		if (!result.toString().includes('"content":null')) {
			const strs = result.split('\n');
			for (const str of strs) {
				if (str === '') {
					continue;
				}
				const jsonStr = JSON.parse(str.slice(6));

				const delta = jsonStr.choices[0].delta.content;
				if (delta) {
					accumulatedText += delta;
					onDelta(accumulatedText);
				}
			}
		}
	}
}
