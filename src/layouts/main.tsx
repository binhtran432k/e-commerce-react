import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { PropsWithChildren } from "react";

function Main({ children }: PropsWithChildren) {
	return (
		<>
			<header className="container m-auto">
				<NavBar />
			</header>
			<main className="container m-auto bg-orange-100 min-h-[120vh] text-5xl flex items-center justify-center">
				{children}
			</main>
			<Footer />
		</>
	);
}

export default Main;
