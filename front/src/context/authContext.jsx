import { createContext, useState } from "react";

const AuthContext = createContext();

const cookieValue = document.cookie
  .split('; ')
  .find((row) => row.startsWith('token='))
  ?.split('=')[1];

const initialAuth = cookieValue

const AuthProvider = ({children}) =>{

    const [userLoad, setAuth] = useState(initialAuth);

    const handleAuth = (e) =>{
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 7 * 60 * 60 * 1000;
        now.setTime(expireTime);
        document.cookie = `token=${e}; expires=${now.toUTCString()};path=/admin`
        setAuth(e)
    }

    const handleLogOut = (e) =>{
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/admin';
        setAuth("")
    }

    const data = {userLoad,handleAuth,handleLogOut}

    return <AuthContext.Provider value={data} >{children}</AuthContext.Provider>
}

export {AuthProvider}
export default AuthContext