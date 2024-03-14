import Banner from "@/components/banner";
import Category from "@/components/category";
import OtherInformation from "@/components/other-information";
import ProductList from "@/components/product-list";
import { memo } from "react";

const Home = memo(() => {
	return (
		<main>
			<Banner />
			<Category />
			<ProductList />
			<OtherInformation />
		</main>
	);
});

export default Home;
