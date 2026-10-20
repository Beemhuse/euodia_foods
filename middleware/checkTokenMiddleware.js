import { getCookie } from '@/utils/getCookie';
import { removeCookies } from '@/utils/removeCookie';
import { client } from '@/utils/sanity/client';
import {jwtDecode} from 'jwt-decode';  // Corrected import statement

const checkTokenExpirationMiddleware = async () => {
    const token = getCookie("admineu_token");
    if (!token) {
      window.location.replace('/auth/login');
      return;
    }
  
    const decodedToken = jwtDecode(token);
    const currentDate = new Date();
  
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      removeCookies('admineu_token');
      window.location.replace('/auth/login');
      return;
    }
  
    try {
        const admin = await client.fetch(`*[_type == "admin" && _id == $userId]`, { userId: decodedToken.userId });
      if (!admin || admin.length === 0) {
        removeCookies('admineu_token');
        window.location.replace('/auth/login');
      } 
    } catch (error) {
      removeCookies('admineu_token');
      window.location.replace('/auth/login');
    }
  };
  
  export default checkTokenExpirationMiddleware;