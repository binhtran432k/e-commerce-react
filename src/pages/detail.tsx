import { useParams } from "react-router-dom";

type DetailParams = "productId";

function Detail() {
	const params = useParams<DetailParams>();

	return (
		<>
			<h1>Detail</h1>
			<p>{params.productId}</p>
		</>
	);
}

export default Detail;
