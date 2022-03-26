import { caxios } from "../../utils/axios";
import { ILoginData, IRegisterData } from "./authen.interface";


const Auth = {
    register: {
        fetch: async (registerData: IRegisterData) => {
            return caxios.post("api/auth/register", {...registerData});
        }
    },
    login: {
        fetch: async (loginData: ILoginData) => {
            return caxios.post("api/auth/log-in", {...loginData});
        }
    },
    logout: {
        fetch: async () => {
            return caxios.post("api/auth/log-out");
        }
    },
    profile: {
        fetch: async () => {
            return caxios.get("api/auth/profile");
        }
    }
}

export default Auth;