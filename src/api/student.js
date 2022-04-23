import axios from 'axios'


export const loginStudentWithToken = async (studentToken,signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API
        const config = {
            method: 'post',
            url: `${apiUrl}/students/check`,
            signal,
            headers: {
                Authorization: `Bearer ${studentToken}`
            }
        }

        const userData = await axios(config)

        return userData.data.user
    } catch (err) {
        throw err
    }
}

export const loginStudent = async (credentials,signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API
        const config = {
            method: 'post',
            url: `${apiUrl}/students/login`,
            signal,
            data: {
                username: credentials.username,
                password: credentials.password
            }
        }

        const userData = await axios(config)

        return { user: userData.data.user, token: userData.data.token }
    } catch (err) {
        throw err
    }
}

export const changeMyPassStudent = async (studentToken, password, newPassword,signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'patch',
            url: `${apiUrl}/students/me/pass`,
            signal,
            headers: {
                Authorization: `Bearer ${studentToken}`
            },
            data: {
                password,
                newPassword
            }
        }
        const response = await axios(config)
        if (response.status !== 200) throw new Error("could'nt change password")
        return
    } catch (err) {
        throw err
    }
}

export const changeMyData = async (studentToken, changeData,signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'patch',
            url: `${apiUrl}/students/me`,
            signal,
            headers: {
                Authorization: `Bearer ${studentToken}`
            },
            data: {
                ...changeData
            }
        }
        const response = await axios(config)
        if (response.status !== 200) throw new Error("could'nt change data")
        return response.data.user
    } catch (err) {
        throw err
    }
}

export const getMyCourses = async (studentToken,signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API
    
        const config = {
            method: 'get',
            url: `${apiUrl}/students/me/courses`,
            signal,
            headers: {
                Authorization: `Bearer ${studentToken}`
            }
        }
        const response = await axios(config)
        if (response.status !== 200) throw new Error("Error")
        return response.data.courses
    } catch (err) {

    }
}

export const addAttendanceData = async (studentToken, courseId, sessionId, attendanceData,signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API
    
        const config = {
            method: 'patch',
            url: `${apiUrl}/courses/me/${courseId}/${sessionId}`,
            signal,
            headers: {
                Authorization: `Bearer ${studentToken}`
            },
            data: {
                sessionId,
                attendanceData
            }
        }
        await axios(config)
        return
    } catch (err) {
        throw err
    }
}

