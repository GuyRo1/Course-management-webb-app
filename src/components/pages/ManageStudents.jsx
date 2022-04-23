import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MediaContext } from '../../context/MediaContext'
import StudentSearchBar from '../manageStudents/studentsSearchBar'
import RegisterStudentForm from '../manageStudents/RegistrationForm'
import { ReactComponent as AddStudent } from '../../assets/svg/addStudent.svg'
import { ReactComponent as Search } from '../../assets/svg/search.svg'
import SvgContainer from '../shared/SvgContainer'




const ManageStudentsPage = (props) => {



    const { isMobile } = useContext(MediaContext)

    const assignClassName = className => isMobile ? `${className} mobile` : className

    const [addStudentMode, setAddStudentMode] = useState(false)

    const navigate = useNavigate()

    const navigateToPage = result => {
        switch (result.type) {
            case 'choice':
                navigate(`/students/${result.result.id}`)
                break;
            case 'suggestions':
                if (result.result.searchTerm !== '')
                    navigate(`/students-search/${result.result.searchTerm}`)
                else
                    navigate(`/students-search/all-students`)
                break;
            default:
                break;
        }
    }


    return (

        <main className={assignClassName('')}>
            <div className={assignClassName("manage-students-page")}>
                {
                    !addStudentMode ?
                        <SvgContainer
                            callback={() => { setAddStudentMode(true) }}
                            className={assignClassName("add-student-svg-container")}
                            Component={AddStudent} />
                        :
                        <SvgContainer
                            callback={() => { setAddStudentMode(false) }}
                            className={assignClassName("search-svg-container")}
                            Component={Search} />
                }

                {
                    !addStudentMode ?
                        <StudentSearchBar sendResult={navigateToPage} />
                        : <RegisterStudentForm />
                }
            </div>
        </main>
    )
}


export default ManageStudentsPage
