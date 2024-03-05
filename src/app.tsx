import { ReactNode, Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loading from "./components/loading/loading";

const ROOT_PATH = import.meta.env.VITE_ROOT_PATH || "/";

const Cart = lazy(() => import("./pages/cart"));
const Checkout = lazy(() => import("./pages/checkout"));
const Detail = lazy(() => import("./pages/detail"));
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const NotFound = lazy(() => import("./pages/not-found"));
const Register = lazy(() => import("./pages/register"));
const Shop = lazy(() => import("./pages/shop"));

function wrapLoading(child: ReactNode) {
	return <Suspense fallback={<Loading />}>{child}</Suspense>;
}

const router = createBrowserRouter([
	{
		path: ROOT_PATH,
		errorElement: wrapLoading(<NotFound />),
		children: [
			{ index: true, element: wrapLoading(<Home />) },
			{ path: "shop", element: wrapLoading(<Shop />) },
			{ path: "detail/:productId", element: wrapLoading(<Detail />) },
			{ path: "cart", element: wrapLoading(<Cart />) },
			{ path: "checkout", element: wrapLoading(<Checkout />) },
			{ path: "login", element: wrapLoading(<Login />) },
			{ path: "register", element: wrapLoading(<Register />) },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
