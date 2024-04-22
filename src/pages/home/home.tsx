import { memo } from "react";
import Banner from "./banner";
import BannerFoot from "./banner-foot";
import Category from "./category";
import Subcribe from "./subcribe";
import Trending from "./trending";

const Home = memo(() => {
	return (
		<main>
			<Banner />
			<Category />
			<Trending />
			<BannerFoot />
			<Subcribe />
		</main>
	);
});

export default Home;
