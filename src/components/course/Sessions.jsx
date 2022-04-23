import { useEffect, useState } from 'react'
import { dayInWeekConvertor, monthConvertor } from '../../utils/convertor'
const Sessions = ({ attendance,action }) => {

    const [sessionsToShow, setSessionsToShow] = useState([])



    const chooseListItemClass = (index) => index % 2 === 0 ? "even" : "odd"


    useEffect(() => {
        const sessions = []
        for (let i = 0; i < attendance.length; i++) {
            const sessionDate = new Date(attendance[i].date)
            if (sessionDate < Date.now())
                sessions.push({
                    date: sessionDate,
                    display: `${dayInWeekConvertor(sessionDate.getDay())}, ${sessionDate.getDate()} ${monthConvertor(sessionDate.getMonth())}`,
                    key: attendance[i]._id
                })

        }
        setSessionsToShow(sessions)

    }, [])

    return (

        <ul className="sessions-container">
            {sessionsToShow.length !== 0 &&
                sessionsToShow.map((session, index) => (
                    <li
                        key={session.key}
                        className={chooseListItemClass(index)}
                        onClick={()=>{action(index)}}>
                        {session.display}
                    </li>
                ))}
        </ul>

    )
}

export default Sessions