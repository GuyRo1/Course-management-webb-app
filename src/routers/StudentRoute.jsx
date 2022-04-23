import { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'
import { Outlet, Navigate } from 'react-router-dom'



const StudentRoute = ({
    redirectPath = '/home'
}) => {

    const { userData } = useContext(LoginContext)

    return (
        <>
            {
                userData.type !== 'student' ?
                    <Navigate to={redirectPath} replace /> :
                    <Outlet />
            }
        </>
    )
};

export default StudentRoute