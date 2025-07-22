import { List as AntdList, type ListProps as AntdListProps } from 'antd-mobile';
import type { CSSProperties } from 'react';
import styles from './index.module.less';
import clsx from 'clsx';
interface ListProps extends AntdListProps {
	children?: React.ReactNode;
	className?: string;
	style?: CSSProperties;
}

const MessageList = ({ children, className, style }: ListProps) => {
	return (
		<AntdList className={clsx(styles.list, ' - ', className)} style={style}>
			{children}
		</AntdList>
	);
};

export default MessageList;
