import { loginProfessorWithToken } from './../api/professor.js'
import {loginStudentWithToken} from './../api/student.js'

export const userDataInitialState = { type: "pending", user: null, token: "" }


export const loginFromLocalStorage = async (signal) => {
    try {
        const data = JSON.parse(localStorage.getItem("cms-web-app-token"))
        if (!data) throw new Error()
        switch (data.type) {
            case "professor":
                const professorData = await loginProfessorWithToken(data.token,signal)
                return {
                    type: 'professor',
                    user: professorData,
                    token: data.token
                }
            case "student":
               const studentData = await loginStudentWithToken(data.token,signal)
               return {
                type: 'student',
                user: studentData,
                token: data.token
            }
            default:
                throw new Error();
        }


    } catch (err) {
        throw new Error()
    }


}

const loginReducer = (userData, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { type: action.payload.type, user: { ...action.payload.user }, token: action.payload.token }
        case "LOGOUT":
            return { type: 'visitor', user: null, token: null }
        case "VISITOR":
            return { type: 'visitor', user: null, token: null } 
        default:
            return { ...userData }
    }
}

export default loginReducer