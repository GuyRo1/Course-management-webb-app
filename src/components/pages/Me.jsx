import { useContext, useEffect, useState } from 'react'
import { LoginContext } from './../../context/LoginContext'
import StudentForm from '../me/StudentForm'
import ProfessorForm from '../me/ProfessorForm'
import { MediaContext } from './../../context/MediaContext'
import SvgContainer from '../shared/SvgContainer'
import { ReactComponent as EditUser } from '../../assets/svg/editUser.svg'




const Me = () => {

    const { userData } = useContext(LoginContext)

    const { isMobile } = useContext(MediaContext)
    const assignClassName = className => isMobile ? `${className} mobile` : className

    const [showOnly, setShowOnly] = useState(true)

    const toggleShowOnly = () => {
        setShowOnly(!showOnly)
    }
    useEffect(() => {
    }, [userData])


    return (
        <main className={assignClassName('')}>
            <div className={assignClassName('me-container')}>
                <SvgContainer
                    callback={toggleShowOnly}
                    className={assignClassName("edit-svg-container")}
                    Component={EditUser} />
                {
                    userData.type === 'professor' ?
                        <ProfessorForm
                            data={userData.user}
                            showOnly={showOnly} /> :
                        <StudentForm
                            data={userData.user}
                            showOnly={showOnly} />
                }
            </div>
        </main>
    )
}

export default Me