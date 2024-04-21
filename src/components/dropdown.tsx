import type { Item } from "@/definitions";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Dropdown({
	options,
	value,
	className,
	onChange,
}: {
	options: Item[];
	value?: Item;
	className?: string;
	onChange?: (option: Item) => void;
}) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isActive, setIsActive] = useState(false);

	const toggleIsActive = useCallback(() => setIsActive((x) => !x), []);
	const clickOutsideListener = useCallback(({ target }: MouseEvent) => {
		if (!ref.current?.contains(target as Node)) {
			setIsActive(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("click", clickOutsideListener);
		return () => {
			document.removeEventListener("click", clickOutsideListener);
		};
	}, [clickOutsideListener]);

	return (
		<div className={clsx("relative", className)} ref={ref}>
			<button
				type="button"
				onClick={toggleIsActive}
				className="w-full px-3 py-2 flex items-center justify-between bg-gray-900 text-gray-50"
			>
				{value?.label ?? "---"}
				<ChevronDownIcon className="w-4" />
			</button>
			<ul
				className={clsx(
					"absolute w-full top-100 left-0 bg-gray-50",
					!isActive && "hidden",
				)}
			>
				{options.map((option) => (
					<li key={option.label}>
						<button
							type="button"
							className="px-3 py-2 w-full text-left hover:bg-gray-100"
							onClick={() => {
								onChange?.(option);
								setIsActive(false);
							}}
						>
							{option.label}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
