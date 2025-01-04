import { useCookies } from 'react-cookie';

const useRemoveCookie = () => {
	const [, , removeCookie] = useCookies();
	const removeCustomeCookie = (name) => {
		removeCookie(name, {
			path: '/',
		});
	};
	return { removeCustomeCookie };
};

export default useRemoveCookie;
