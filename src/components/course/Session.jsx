
import { useEffect, useState } from 'react';

const Session = ({ students, sessionData }) => {


    const [studentsData, setStudentsData] = useState([])

    useEffect(() => {
        let studentData
        const aggregateData = []
        for (let i = 0; i < sessionData.students.length; i++) {
            studentData = { ...sessionData.students[i] }
            studentData.studentId = studentData.student
            studentData.student = null
            for (let j = 0; j < students.length; j++) {
                if (students[j].student._id === studentData.studentId) {

                    studentData.student = students[j].student
                }
            }
            if (!!studentData.student) {
                aggregateData.push(studentData)
            }

        }
        setStudentsData(aggregateData)
    }, [])

    useEffect(() => {
    }, [studentsData])

    const chooseListItemClass = (index) => index % 2 === 0 ? "even" : "odd"

    return (

        <ul>
            {sessionData.students.length !== 0 &&
                studentsData.map((student, index) =>
                    <li className={chooseListItemClass(index)} key={student._id}>
                        <div>{`${student.student.firstname} ${student.student.lastname}`}</div>
                        <div>{student.status}</div>
                        {student.status === 'missed' && <div>{student.message}</div>}
                    </li>
                )}
        </ul>

    )
}

export default Session