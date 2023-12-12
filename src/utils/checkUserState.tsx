import { jwtDecode } from 'jwt-decode';
const token = localStorage.getItem('token');
const checkUserState = () => {
    if(token == null) return null;
    const decodedToken = jwtDecode(token);
    // @ts-ignore
    if (decodedToken.is_admin) {
        return "admin";
    }
    return "user";
};

export default checkUserState;
