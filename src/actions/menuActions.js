export const displayVisitorMenu = () => ({
    type: "DISPLAY_MENU",
    payload:
        [
            {
                key: 0,
                text: "Login",
                type: "link",
                url: '/login',
            }
        ]
})

export const displayProfessorMenu = () => ({
    type: "DISPLAY_MENU",
    payload:
        [
            {
                key: 0,
                text: "Logout",
                type: "action",
                action: 'logout',
            },
            {
                key: 1,
                text: "Profile",
                type: "link",
                url: '/me',
            },
            {
                key: 2,
                text: "Change password",
                type: "link",
                url: '/me/change-password',
            },
            {
                key: 3,
                text: "Manage Students",
                type: "link",
                url: '/manage-students',
            },
            {
                key: 4,
                text: "Manage Courses",
                type: "link",
                url: '/manage-courses',
            }
        ]
})

export const displayStudentMenu = () => ({
    type: "DISPLAY_MENU",
    payload:
        [
            {
                key: 0,
                text: "Logout",
                type: "action",
                action: 'logout',
            },
            {
                key: 1,
                text: "Profile",
                type: "link",
                url: '/me',
            },
            {
                key: 2,
                text: "Change password",
                type: "link",
                url: '/me/change-password',
            },
            {
                key: 3,
                text: "My Courses",
                type: "link",
                url: '/me/courses',
            }
        ]
})