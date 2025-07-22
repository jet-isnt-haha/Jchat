import {
	TextArea as AntdTextArea,
	type TextAreaProps as AntdTextAreaProps
} from 'antd-mobile';
import type { CSSProperties } from 'react';
import styles from './index.module.less';
import clsx from 'clsx';

interface TextAreaProps extends Omit<AntdTextAreaProps, 'onChange'> {
	className?: string;
	style?: CSSProperties;
	onChange?: (value: string) => void;
}

const TextArea = ({ className, style }: TextAreaProps) => {
	return (
		<AntdTextArea
			placeholder="please input"
			className={clsx(styles.input, ' - ', className)}
			style={style}
		/>
	);
};

export default TextArea;
