import CentralMessage from '../shared/CentralMessage'
import { getCourse } from '../../api/professor'
import { useContext, useEffect, useState } from 'react'
import { MediaContext } from '../../context/MediaContext'
import { useParams, useNavigate } from 'react-router-dom'
import { LoginContext } from './../../context/LoginContext';
import { ReactComponent as Delete } from '../../assets/svg/deleteCourse.svg'
import { ReactComponent as List } from '../../assets/svg/list.svg'
import { ReactComponent as Add } from '../../assets/svg/plus.svg'
import SVGContainer from './../shared/SvgContainer';
import { addStudentToCourse, deleteCourse, getStudentsForCourse } from './../../api/professor';
import Sessions from '../course/Sessions'
import AddStudentToCourse from '../course/AddStudentToCourse'
import Session from './../course/Session';

const Course = () => {

    const { isMobile } = useContext(MediaContext)

    const { userData } = useContext(LoginContext)

    const [courseData, setCourseData] = useState(null)

    const [students, setStudents] = useState(null)

    const [session, setSession] = useState(-1)

    const [addStudentMode, setAddStudentMode] = useState(false)

    const [studentToAdd, setStudentToAdd] = useState(null)

    const navigate = useNavigate()

    const courseId = useParams().courseId

    const Abortcontroller = new AbortController()

    useEffect(() => {

        return () => {
            Abortcontroller.abort();
          };

    },[])


    useEffect(() => {

        async function fetchData(signal) {
            try {
                let response = await getCourse(userData.token, courseId,signal)
                setCourseData(response)
                response = await getStudentsForCourse(userData.token, courseId,signal)
                setStudents(response)
            } catch {
            }
        }
        const controller = new AbortController()
        if (userData.type === "professor")
            fetchData(controller.signal);

        return () => {
            controller.abort();
        };

    }, [courseId, userData])

    useEffect(() => {
        async function sendDataToDB(signal) {
            try {
                await addStudentToCourse(userData.token, courseId, studentToAdd,signal)
            } catch {
                alert("student wasn't added to the course");
            }
        }
        const controller = new AbortController()
        if (!!studentToAdd)
            sendDataToDB(controller.signal);

            return () => {
                controller.abort();
              };
    }, [studentToAdd, setStudentToAdd, userData, courseId])

    const removeCourse = async () => {
        try {
            await deleteCourse(userData.token, courseId,Abortcontroller.signal)
            navigate('/manage-courses')
        } catch (err) {
        }
    }

    const parseDaysOfWeek = daysArray => {

        const numberToName = numberedDay => {
            switch (numberedDay) {
                case 0:
                    return 'Sunday';
                case 1:
                    return 'Monday';
                case 2:
                    return 'Tuesday';
                case 3:
                    return 'Wednesday';
                case 4:
                    return 'Thursday';
                case 5:
                    return 'Friday';
                case 6:
                    return 'Saturday';
                default:
                    return undefined;
            }
        }

        let daysOfTheWeek = ""
        daysArray.forEach(day => {
            daysOfTheWeek += `${numberToName(day.day)}, `
        })
        return daysOfTheWeek.slice(0, daysOfTheWeek.length - 2)
    }

    const assignClassName = className => isMobile ? `${className} mobile` : className

    return (
        <main className={assignClassName('')}>
            {
                !!courseData ?
                    <>
                        <SVGContainer
                            callback={removeCourse}
                            className={assignClassName("delete-course-svg-container")}
                            Component={Delete} />
                        <div className="course-data">
                            <div className="label">Course ID</div>
                            <div className="value">{courseData._id}</div>
                            <div className="label">Name</div>
                            <div className="value">{courseData.name}</div>
                            <div className="label">Start date</div>
                            <div className="value">{courseData.startdate}</div>
                            <div className="label">End date</div>
                            <div className="value">{courseData.enddate}</div>
                            <div className="label">Days of the week</div>
                            <div className="value">{parseDaysOfWeek(courseData.daysofweek)}</div>
                        </div>
                        <div className="course__sub-menu__buttons">
                            <SVGContainer
                                callback={() => {
                                    setAddStudentMode(false)
                                    setSession(-1)
                                }}
                                className={"delete-course-svg-container"}
                                Component={List} />
                            <SVGContainer
                                callback={() => {
                                    setAddStudentMode(true)
                                    setSession(-1)
                                }}
                                className="delete-course-svg-container"
                                Component={Add} />
                        </div>
                        {
                            addStudentMode ?
                                <AddStudentToCourse sendResult={result => {
                                    setStudentToAdd(result.result.id)
                                }} /> :
                                session === -1 ?
                                    <Sessions
                                        attendance={courseData.attendance}
                                        action={setSession} />
                                    :
                                    <Session
                                        sessionData={courseData.attendance[session]}
                                        students={students}>
                                    </Session>

                        }

                    </>
                    : <CentralMessage
                        message={`No Course with this id`} />
            }
        </main>
    )
}

export default Course;