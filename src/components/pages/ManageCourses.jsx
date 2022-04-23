import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MediaContext } from '../../context/MediaContext'
import CoursesSearchBar from '../manageCourses/CoursesSearchBar'
import RegisterStudentForm from '../manageCourses/newCourseForm'
import { ReactComponent as AddStudent } from '../../assets/svg/plus.svg'
import { ReactComponent as Search } from '../../assets/svg/search.svg'
import SvgContainer from '../shared/SvgContainer'

const ManageCoursesPage = (props) => {

    const { isMobile } = useContext(MediaContext)

    const assignClassName = className => isMobile ? `${className} mobile` : className

    const [addCourseMode, setAddCourseMode] = useState(false)

    const navigate = useNavigate()

    const navigateToPage = result => {
        switch (result.type) {
            case 'choice':
                navigate(`/courses/${result.result._id}`)
                break;
            case 'suggestions':
                if (result.result.searchTerm !== '')
                    navigate(`/courses-search/${result.result.searchTerm}`)
                else { }
                navigate(`/courses-search/all-courses`)
                break;
            default:
                break;
        }
    }

    const returnToMainScreen = () => {
        setAddCourseMode(false)
    }

    return (
        <main className={assignClassName('')}>
            <div className={assignClassName("manage-courses-page")}>
                {!addCourseMode ?
                    <SvgContainer
                        callback={() => { setAddCourseMode(true) }}
                        className={assignClassName("add-student-svg-container")}
                        Component={AddStudent} />
                    :
                    <SvgContainer
                        callback={() => { setAddCourseMode(false) }}
                        className={assignClassName("search-svg-container")}
                        Component={Search} />}
                {!addCourseMode ?
                    <CoursesSearchBar sendResult={navigateToPage} />
                    : <RegisterStudentForm navigateAfterSubmission={returnToMainScreen} />
                }
            </div>
        </main>
    )
}

export default ManageCoursesPage
