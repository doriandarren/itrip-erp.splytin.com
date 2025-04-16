import { api } from "../../api/api";
import { checkingCredentials, login, logout, setErrorMessage } from "./authSlice";


export const checkingAuthentication = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}


export const startLoginWithEmailPassword = ({ email, password }) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        try {

            const { token, errors } = await api('auth/login', 'POST', {email, password});

            if (!token) {
                console.log(errors);
                dispatch( setErrorMessage(errors[0].e) );
                return;
            }

            const userResponse = await api('auth/user', 'GET', null, token);
            const { email: emailApi, name: nameApi } = userResponse.data;


            const user = {
                status: 'authenticated',
                token: token,
                email: emailApi,
                displayName: nameApi,
                image_url: '',
                errorMessage: null,
            }

            dispatch(login(user));


        } catch (error) {
            console.log(error);
        }

    }

}



export const startLogout = () => {
    return async( dispatch ) => {
        dispatch( logout() );
    }
}



export const startRestoreSession = () => {
    return async(dispatch) => {

        dispatch(checkingCredentials());

        const token = localStorage.getItem("token_portuarios");

        if (!token) {
            dispatch(logout());
            return;
        }


        try {

            const userResponse = await api('auth/user', 'GET', null, token);


            const { email: emailApi, name: nameApi } = userResponse.data;


            const user = {
                status: 'authenticated',
                token: token,
                email: emailApi,
                displayName: nameApi,
                image_url: '',
                errorMessage: null,
            }

            dispatch(login(user));

            //console.log(userResponse.data);



        } catch (error) {
            console.error("Error al restaurar sesión:", error);
            dispatch(logout());
        }



    }
}
