import {
	NavBar as AntdNavBar,
	type NavBarProps as AntdNavBarProps
} from 'antd-mobile';
import styles from '../index.module.less';
import type { CSSProperties } from 'react';
import { clsx } from 'clsx';

interface NavBarProps extends Omit<AntdNavBarProps, 'onBack'> {
	children?: React.ReactNode;
	className?: string;
	style?: CSSProperties;
	onBack?: () => void;
}

const SideBarIcon = <div style={{ fontSize: '0.5rem' }}>SideBarIcon</div>;
const NewChatIcon = <div style={{ fontSize: '0.5rem' }}>NewChatIcon</div>;

const NavBar = ({ children = 'JetBot', className, style }: NavBarProps) => {
	return (
		<AntdNavBar
			backIcon={false}
			className={clsx(styles.nav, ' - ', className)}
			left={SideBarIcon}
			right={NewChatIcon}
			style={style}
		>
			{children}
		</AntdNavBar>
	);
};

export default NavBar;
