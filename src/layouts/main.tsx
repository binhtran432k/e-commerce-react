import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { PropsWithChildren } from "react";

function Main({ children }: PropsWithChildren) {
	return (
		<>
			<header className="container m-auto">
				<NavBar />
			</header>
			{children}
			<Footer />
		</>
	);
}

export default Main;
