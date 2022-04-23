import { useContext, useEffect } from 'react'
import { LoginContext } from '../context/LoginContext'
import { Outlet, Navigate } from 'react-router-dom'



const UserRoute = ({
    redirectPath = '/home'
}) => {

    const { userData } = useContext(LoginContext)

    return (
        <>
            {
                userData.type === 'visitor' ?
                    <Navigate to={redirectPath} replace /> :
                    <Outlet />
            }
        </>
    )
};

export default UserRoute