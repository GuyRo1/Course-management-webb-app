export const loginStudentAction = ({ user, token }) => ({
    type: 'LOGIN',
    payload: {
        type: "student",
        user,
        token
    }
})

export const loginProfessorAction = ({ user, token }) => ({
    type: 'LOGIN',
    payload: {
        type: "professor",
        user,
        token
    }
})

export const accessSiteAsVisitorAction = () => ({
    type: 'VISITOR'

})

export const logoutAction = () => ({
    type: 'LOGOUT'
})