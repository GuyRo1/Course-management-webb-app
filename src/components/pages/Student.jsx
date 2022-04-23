import { getStudent } from '../../api/professor'
import { useContext, useEffect, useState } from 'react'
import { MediaContext } from '../../context/MediaContext'
import { useParams, useNavigate } from 'react-router-dom'
import { LoginContext } from './../../context/LoginContext';
import SvgContainer from '../shared/SvgContainer'
import { ReactComponent as Delete } from '../../assets/svg/deleteStudent.svg'
import { deleteStudent } from '../../api/professor'
import CentralMessage from './../shared/CentralMessage';

const Student = () => {

    const navigate = useNavigate()

    const { isMobile } = useContext(MediaContext)

    const { userData } = useContext(LoginContext)

    const [studentData, setStudentData] = useState(null)

    const studentId = useParams().studentId

    const controller = new AbortController()

    useEffect(() => {

        return () => {
            controller.abort();
          };

    },[])

    useEffect(() => {

        async function fetchData(signal) {
            try {
                const studentData = await getStudent(userData.token, studentId,signal)
                setStudentData(studentData)
            } catch {
            }
        }
        const controller = new AbortController()
        if (userData.type === "professor")
            fetchData(controller.signal);

        return () => {
            controller.abort();
        };



    }, [studentId, userData])

    const assignClassName = className => isMobile ? `${className} mobile` : className

    const removeStudent = async () => {
        try {
            await deleteStudent(userData.token, studentId,controller.signal)
            navigate('/manage-students')
        } catch (err) {
        }
    }

    return (
        <main className={assignClassName('')}>
            {
                !!studentData ?
                    <>
                        <div className="student-data">
                            <div className="label">Student ID</div>
                            <div className="value">{studentData.id}</div>
                            <div className="label">Student Username</div>
                            <div className="value">{studentData.username}</div>
                            <div className="label">Student Email</div>
                            <div className="value">{studentData.email}</div>
                            <div className="label">Student First Name</div>
                            <div className="value">{studentData.firstname}</div>
                            <div className="label">Student Last Name</div>
                            <div className="value">{studentData.lastname}</div>
                            <div className="label">Student Date of birth</div>
                            <div className="value">{studentData.dateOfBirth}</div>
                        </div>

                        <SvgContainer
                            callback={removeStudent}
                            className={assignClassName("delete-student-svg-container")}
                            Component={Delete} />
                    </>
                    : <CentralMessage
                        message={`No Student with this id`} />
            }
        </main>
    )
}

export default Student;