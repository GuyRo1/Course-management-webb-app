import { createContext, useReducer, useEffect } from "react";
import loginReducer, { userDataInitialState, loginFromLocalStorage } from '../reducers/loginReducer'
import { loginProfessorAction, loginStudentAction, accessSiteAsVisitorAction } from '../actions/loginActions'
import MainLoader from '../components/shared/MainLoader'

export const LoginContext = createContext()

const LoginContextProvider = (props) => {
    const [userData, userDataDispatch] = useReducer(loginReducer, userDataInitialState)

    useEffect(() => {
        async function fetchData(signal) {
            try {
                const data = await loginFromLocalStorage(signal)
                switch (data.type) {
                    case 'professor': {
                        userDataDispatch(loginProfessorAction({ user: data.user, token: data.token }))
                        break;
                    }
                    case 'student': {
                        userDataDispatch(loginStudentAction({ user: data.user, token: data.token }))
                        break;
                    }
                    default: {
                        userDataDispatch(accessSiteAsVisitorAction())
                        break;
                    }
                }

            } catch {
                userDataDispatch(accessSiteAsVisitorAction())
            }
        }
        const controller = new AbortController();
        fetchData(controller.signal)

        return () => {
            controller.abort();
        };
    }, [])

    return (

        
        <>
            {
                userData.type !== 'pending'
                    ?
                    <LoginContext.Provider value={{ userData, userDataDispatch }}>
                        {props.children}
                    </LoginContext.Provider> :
                    <MainLoader />
            }
        </>
    )
}

export default LoginContextProvider