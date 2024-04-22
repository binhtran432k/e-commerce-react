import { memo } from "react";

const Subcribe = memo(() => {
	return (
		<article className="container px-4 my-12 m-auto flex flex-wrap gap-6 items-center justify-between">
			<header className="italic">
				<h3 className="text-xl uppercase font-medium">Let's be friends!</h3>
				<p className="text-sm text-gray-400">
					Nisi nisi tempor consequat laboris nisi.
				</p>
			</header>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					alert("This function has not been implemented yet!");
				}}
				className="flex flex-col sm:flex-row justify-end grow"
			>
				<input
					type="email"
					className="p-4 border border-gray-400 sm:max-w-[30rem] grow"
					placeholder="Enter your email address"
				/>
				<button
					type="submit"
					className="px-7 py-4 bg-gray-900 hover:bg-gray-700 text-gray-300"
				>
					Subcribe
				</button>
			</form>
		</article>
	);
});

export default Subcribe;
