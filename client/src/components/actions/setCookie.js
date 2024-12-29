import {useCookies} from 'react-cookie';
const useSetCookie = () => {
    const [cookies, setCookie] = useCookies();
    
    const setCustomeCookie = (name, value) => {
        setCookie(name, value, { 
            path: '/', 
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });
    }

    return {setCustomeCookie};
}

export default useSetCookie