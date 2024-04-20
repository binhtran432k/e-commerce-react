import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { popupActions } from "@/store/popup-slice";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import ProductPopup from "./product-popup";

const popupElement = document.body;

function Popup() {
	const popup = useAppSelector((state) => state.popup);
	const dispatch = useAppDispatch();

	useEffect(() => {
		document.body.style.overflow = popup.isShow ? "hidden" : "";
	}, [popup.isShow]);

	const element =
		popup.type === "product" ? <ProductPopup product={popup.data} /> : null;

	return createPortal(
		<div
			className={clsx(
				"fixed flex top-0 w-full h-full z-50 items-center justify-center",
				!element && "hidden",
				popup.isShow ? "animate-fadeIn" : "animate-fadeOut",
			)}
		>
			<button
				type="button"
				className="absolute bg-gray-900/60 w-full h-full hover:cursor-default"
				onClick={() => dispatch(popupActions.hide())}
			/>
			<article
				className={clsx(
					"z-10 max-h-full overflow-auto contain m-auto flex gap-2 items-start justify-between p-4 bg-white",
					!popup.isShow && "animate-moveUp",
				)}
			>
				{element}
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
	);
}

export default Popup;
