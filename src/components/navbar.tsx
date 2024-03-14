import type { LinkItem } from "@/definitions";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/solid";
import clsx from "clsx/lite";
import { Link, NavLink } from "react-router-dom";

const routes: LinkItem[] = [
	{ label: "Home", url: "/" },
	{ label: "Shop", url: "/shop" },
];

const iconClassName = "h-4";
const actions: LinkItem[] = [
	{
		label: "Cart",
		url: "/cart",
		icon: <ShoppingCartIcon className={iconClassName} />,
	},
	{
		label: "Login",
		url: "/login",
		icon: <UserIcon className={iconClassName} />,
	},
];

function NavBarLink({ route }: { route: LinkItem }) {
	return (
		<NavLink
			to={route.url}
			className={({ isActive }) => {
				return clsx(
					"flex items-center gap-1",
					isActive ? "hover:text-orange-200" : "hover:text-gray-400",
					isActive && "text-orange-300",
				);
			}}
		>
			{route.icon}
			{route.label}
		</NavLink>
	);
}

function NavBar() {
	return (
		<nav className="px-6 py-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
			<ul className="flex gap-3 italic">
				{routes.map((route) => (
					<li key={route.label}>
						<NavBarLink route={route} />
					</li>
				))}
			</ul>
			<Link to="/">
				<h1 className="hover:text-gray-400 italic text-3xl uppercase">
					Boutique
				</h1>
			</Link>
			<ul className="flex gap-3 italic">
				{actions.map((route) => (
					<li key={route.label}>
						<NavBarLink route={route} />
					</li>
				))}
			</ul>
		</nav>
	);
}

export default NavBar;
