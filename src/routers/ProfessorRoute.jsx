import { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'
import { Outlet, Navigate } from 'react-router-dom'



const ProfessorRoute = ({
    redirectPath = '/home'
}) => {

    const { userData } = useContext(LoginContext)


    return (
        <>
            {
                userData.type !== 'professor' ?
                    <Navigate to={redirectPath} replace /> :
                    <Outlet />
            }
        </>
    )
};

export default ProfessorRoute