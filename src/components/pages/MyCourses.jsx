
import CentralMessage from '../shared/CentralMessage'
import { useContext, useState, useEffect } from 'react'
import { MediaContext } from '../../context/MediaContext'
import { LoginContext } from '../../context/LoginContext'
import { getMyCourses } from './../../api/student';
import MyCourse from '../myCourses/MyCourse'

const MyCourses = () => {

    const { isMobile } = useContext(MediaContext)

    const assignClassName = className => isMobile ? `${className} mobile` : className

    const { userData } = useContext(LoginContext)

    const [courses, setCourses] = useState([])

    const [singleCourseView, setSingleCourseView] = useState(null)

    useEffect(() => {
        async function fetchData(signal) {
            try {
                const coursesData = await getMyCourses(userData.token,signal)
                coursesData.forEach((course, index) => {
                    course.key = index
                })
                setCourses(coursesData)
            } catch (err) {
            }
        }

        const controller = new AbortController()
        fetchData(controller.signal)

        return () => {
            controller.abort();
        };
    }, [userData.token, singleCourseView])

    return (
        <main className={assignClassName('')}>
            {
                !singleCourseView ?
                    (courses.length !== 0 ?
                        <ul className="courses-container">
                            {courses.map(course => (
                                <li className="course-container"
                                    key={course.key}
                                    onClick={() => { setSingleCourseView(course) }}>
                                    {course.name}
                                </li>
                            ))}
                        </ul>
                        :
                        <CentralMessage message="No Courses for Student" />) :
                    <MyCourse course={singleCourseView} backToCourseList={() => { setSingleCourseView(null) }} />
            }

        </main>
    )
}

export default MyCourses;