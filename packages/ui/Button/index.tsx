import {
	Button as AntdButton,
	type ButtonProps as AntdButtonProps
} from 'antd-mobile';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import styles from '../index.module.less';
interface ButtonProps extends Omit<AntdButtonProps, 'onClick'> {
	children?: React.ReactNode;
	className?: string;
	style?: CSSProperties;
	onClick?: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void | Promise<void>;
}

const Button = ({ children, className, style }: ButtonProps) => {
	return (
		<AntdButton
			className={clsx(styles.btn, ' - ', className)}
			style={style}
			children={children}
		/>
	);
};

export default Button;
