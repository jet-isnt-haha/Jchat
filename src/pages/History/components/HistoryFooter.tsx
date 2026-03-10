import { useAppConfig } from '@/hooks/useConfig';

const HistoryFooter = () => {
	const { user } = useAppConfig();
	return (
		<footer className="absolute flex items-center justify-between px-4 py-3 bg-white border-t border-[#eee] w-screen bottom-0">
			<span className="text-sm text-[#666]">{user.defaultName}</span>
			<span
				className="w-5 h-5 bg-no-repeat bg-center bg-contain"
				style={{ backgroundImage: "url('/icons/setting.svg')" }}
			/>
		</footer>
	);
};

export default HistoryFooter;
