import { ReactNode, Suspense, lazy } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Loading from "./components/loading";
import Main from "./layouts/main";
import { ROOT_PATH } from "./utils/path";

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

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: (
				<Main>
					<Outlet />
				</Main>
			),
			errorElement: wrapLoading(
				<Main>
					<NotFound />
				</Main>,
			),
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
	],
	{ basename: ROOT_PATH },
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
