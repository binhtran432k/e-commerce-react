export const ROOT_PATH = import.meta.env.VITE_ROOT_PATH || "/";

export function getRealPath(path: string) {
	return `${ROOT_PATH}${path}`.replaceAll("//", "/");
}
