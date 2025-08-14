//可复用的图标按钮

interface IconButtonProps {
	onClick?: () => void;
	className: string;
	isLoading?: boolean;
}

const IconButton = ({ onClick, className, isLoading }: IconButtonProps) => {
	const _className = `material-symbols-outlined ${className} ${isLoading ? 'loading' : ''}`;
	return (
		<button className={_className} onClick={onClick}>
			{className}
		</button>
	);
};

export default IconButton;
