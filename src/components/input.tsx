import clsx from "clsx";
import { type InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
	return (
		<input
			{...props}
			className={clsx("py-2 px-3 border border-gray-400", props.className)}
			ref={ref}
		/>
	);
});

export default Input;
