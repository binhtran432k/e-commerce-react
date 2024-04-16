import { useAppDispatch } from "@/hooks/store";
import { popupActions } from "@/store/popup";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { type PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

const popupElement = document.body;

function Popup({
	children,
	isShow,
	className,
}: PropsWithChildren<{ isShow: boolean; className?: string }>) {
	const dispatch = useAppDispatch();
	useEffect(() => {
		document.body.style.overflow = isShow ? "hidden" : "";
	}, [isShow]);

	return (
		isShow &&
		createPortal(
			<div className="fixed top-0 w-full h-full z-50 flex items-center justify-center">
				<button
					type="button"
					className="bg-gray-900/60 w-full h-full hover:cursor-default"
					onClick={() => dispatch(popupActions.hide())}
				/>
				<article className="absolute flex max-h-full gap-2 overflow-auto justify-between m-4 p-4 bg-white">
					<div className={className}>{children}</div>
					<button
						type="button"
						aria-label="close"
						onClick={() => dispatch(popupActions.hide())}
						className="hover:opacity-50 self-start"
					>
						<XMarkIcon className="w-4" />
					</button>
				</article>
			</div>,
			popupElement,
		)
	);
}

export default Popup;
