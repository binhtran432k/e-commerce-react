import Category from "@/components/category";
import LandingBanner from "@/components/landing-banner";
import OtherInformation from "@/components/other-information";
import Trending from "@/components/trending";
import { memo } from "react";

const Home = memo(() => {
	return (
		<main>
			<LandingBanner />
			<Category />
			<Trending />
			<OtherInformation />
		</main>
	);
});

export default Home;
