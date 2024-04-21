import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { memo } from "react";

const Pagination = memo(
	({
		page,
		onNext,
		onPrev,
	}: {
		page: number;
		onNext?: () => void;
		onPrev?: () => void;
	}) => {
		return (
			<div className="flex gap-1">
				<button
					type="button"
					className="border disabled:bg-gray-50 disabled:text-gray-300 hover:bg-gray-100 py-1 px-2 flex place-items-center"
					onClick={onPrev && onPrev}
					disabled={Boolean(!onPrev)}
				>
					<ChevronDoubleLeftIcon className="size-4" />
				</button>
				<span className="border bg-gray-900 text-gray-50 py-1 px-3">
					{page}
				</span>
				<button
					type="button"
					className="border disabled:bg-gray-50 disabled:text-gray-300 hover:bg-gray-100 py-1 px-2 flex place-items-center"
					onClick={onNext && onNext}
					disabled={Boolean(!onNext)}
				>
					<ChevronDoubleRightIcon className="size-4" />
				</button>
			</div>
		);
	},
);

export default Pagination;
