export const initialMenu =
[
    {
        key: 1,
        text: "Login",
        type: "link",
        url: '/login',
    }
]


const menuReducer = (menuData, action) => {
    switch (action.type) {
        case 'DISPLAY_MENU':
            return [ ...action.payload ]
        default:
            return [ ...menuData ]
    }
}

export default menuReducer