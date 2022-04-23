import axios from 'axios'


export const loginProfessorWithToken = async (professorToken, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API
        const config = {
            method: 'post',
            signal,
            url: `${apiUrl}/professors/check`,
            headers: {
                Authorization: `Bearer ${professorToken}`
            }
        }

        const userData = await axios(config)
        return userData.data.user
    } catch (err) {
        throw err
    }
}

export const loginProfessor = async (credentials, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API
        const config = {
            method: 'post',
            url: `${apiUrl}/professors/login`,
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

export const changeMyPassProf = async (professorToken, password, newPassword, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'patch',
            url: `${apiUrl}/professors/me/pass`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
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

export const changeMyData = async (professorToken, changeData, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'patch',
            url: `${apiUrl}/professors/me`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
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

export const searchStudents = async (professorToken, search, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API


        const config = {
            method: 'get',
            url: `${apiUrl}/students`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
            },
            params: {
                ...search
            }
        }

        const response = await axios(config)
        const students = response.data.students
        return students
    } catch (err) {
        throw err
    }
}

export const getStudent = async (professorToken, id, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'get',
            url: `${apiUrl}/students/${id}`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
            }
        }

        const response = await axios(config)
        const students = response.data.student
        return students
    } catch (err) {
        throw err
    }
}

export const getStudentsForCourse = async (professorToken, courseId, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'get',
            url: `${apiUrl}/courses/${courseId}/students/`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
            }
        }

        const response = await axios(config)
        const students = response.data.students
        return students
    } catch (err) {
        throw err
    }
}

export const registerNewStudent = async (professorToken, studentData, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'post',
            url: `${apiUrl}/students`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
            },
            data: {
                studentData
            }
        }

        const response = await axios(config)
        const newStudent = response.data.student

        return { newStudent }
    } catch (err) {
        throw err
    }
}

export const deleteStudent = async (professorToken, studentId, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'delete',
            url: `${apiUrl}/students/${studentId}`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
            },
        }
        const response = await axios(config)
        if (response.status !== 200) throw new Error("no student with this id")
        return true
    } catch (err) {
        throw err
    }
}

export const searchCourses = async (professorToken, search, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'get',
            url: `${apiUrl}/courses`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
            },
            params: {
                ...search
            }
        }

        const response = await axios(config)
        const courses = response.data.courses
        return courses
    } catch (err) {
        throw err
    }
}

export const getCourse = async (professorToken, id, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'get',
            url: `${apiUrl}/courses/${id}`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
            }
        }

        const response = await axios(config)
        const course = response.data.course
        return course
    } catch (err) {
        throw err
    }
}

export const addNewCourse = async (professorToken, courseData, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'post',
            url: `${apiUrl}/courses`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
            },
            data: {
                courseData
            }
        }
        const response = await axios(config)
        const newCourse = response.data.course
        return { newCourse }
    } catch (err) {
        throw err
    }
}

export const addStudentToCourse = async (professorToken, courseId, studentId, signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'patch',
            url: `${apiUrl}/courses/${courseId}/${studentId}`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
            },
        }
        await axios(config)
        return true
    } catch (err) {
        throw err
    }
}

export const deleteCourse = async (professorToken, courseId,signal) => {
    try {
        const apiUrl = process.env.REACT_APP_REST_API

        const config = {
            method: 'delete',
            url: `${apiUrl}/courses/${courseId}`,
            signal,
            headers: {
                Authorization: `Bearer ${professorToken}`
            },
        }
        const response = await axios(config)
        if (response.status !== 200) throw new Error("no course with this id")
        return true
    } catch (err) {
        throw err
    }
}





