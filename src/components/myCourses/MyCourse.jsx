import { ReactComponent as Back } from '../../assets/svg/back.svg'
import { ReactComponent as Edit } from '../../assets/svg/edit.svg'
import { ReactComponent as Save } from '../../assets/svg/save.svg'
import { ReactComponent as Watch } from '../../assets/svg/watch.svg'
import { useState, useEffect, useContext } from 'react'
import SVGContainer from './../shared/SvgContainer';
import { dayInWeekConvertor, monthConvertor } from '../../utils/convertor'
import Select from 'react-select'
import { addAttendanceData } from '../../api/student'
import { LoginContext } from './../../context/LoginContext';


const MyCourse = (props) => {
    const { userData } = useContext(LoginContext)
    const [courseData, setCourseData] = useState(props.course)
    const [session, setSession] = useState(-1)
    const [selectedStatusOption, setSelectedStatusOption] = useState({ value: null, label: null })
    const [reason, setReason] = useState("")
    const backToCourseList = props.backToCourseList

    const controller = new AbortController()

    useEffect(() => {

        return () => {
            controller.abort();
        };

    }, [])
  
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

    const displayDate = (dateAsString) => {
        const date = new Date(dateAsString)
        return `${dayInWeekConvertor(date.getDay())}, ${date.getDate()} ${monthConvertor(date.getMonth())}`
    }

    const saveToDB = async () => {
        try {
            await addAttendanceData(
                userData.token,
                courseData.id,
                courseData.attendance[session].key,
                { status: selectedStatusOption.label, reason:reason||"attended" },
                controller.signal
            )
            backToCourseList()
        } catch (err) {
            alert('Could not update attendance data')
        }
    }

    useEffect(() => {
        const data = { ...courseData }
        data.attendance.forEach((item) => {
            item.display = true
        })

        setCourseData(data)
    }, [])


    const setEditableSession = (index) => {
        const data = { ...courseData }
        data.attendance.forEach((item, i) => {
            if (i !== index)
                item.display = true
            else
                item.display = false
        })
        setCourseData(data)
    }

    const editSession = (index) => {
        setReason("")
        setSelectedStatusOption({ value: null, label: null })
        setEditableSession(index)
        setSession(index)
    }

    const noEdit = ()=>{
        setReason("")
        setSelectedStatusOption({ value: null, label: null })
        setEditableSession()
        setSession()
    }



    return (
        <>
            <SVGContainer
                callback={backToCourseList}
                className={"arrow-back-container"}
                Component={Back} />

            <div className="my-course-data">
                <div className="label">Course ID</div>
                <div className="value">{courseData.id}</div>
                <div className="label">Name</div>
                <div className="value">{courseData.name}</div>
                <div className="label">Start date</div>
                <div className="value">{courseData.startdate}</div>
                <div className="label">End date</div>
                <div className="value">{courseData.enddate}</div>
                <div className="label">Days of the week</div>
                <div className="value">{parseDaysOfWeek(courseData.daysofweek)}</div>
            </div>

            <div className="my-attendance-data">
                <ul>
                    {
                        courseData.attendance.map((session, index) =>
                            session.display ?
                                <li className="attendance-container" key={session.key}>
                                    <div className="my-course-date">{displayDate(session.date)}</div>
                                    <div className="my-course-status">{session.data.status}</div>
                                    <div className="my-course-reason">{session.data.reason}</div>
                                    <SVGContainer
                                        callback={() => { editSession(index) }}
                                        className={"button-container"}
                                        Component={Edit} />
                                </li>
                                :
                                <li key={session.key}>
                                    <form className="session-attendance-form">
                                        <div className="my-course-date">{displayDate(session.date)}</div>
                                        <Select
                                            className="status-input"
                                            defaultValue={session.data.status}
                                            onChange={setSelectedStatusOption}
                                            options={[{
                                                value: '0',
                                                label: 'attended'
                                            },
                                            {
                                                value: '1',
                                                label: 'missed'
                                            }]}
                                        />
                                        {
                                            selectedStatusOption.value === '1' &&

                                            <input value={reason} onChange={(event) => {
                                                event.preventDefault()
                                                setReason(event.target.value)
                                            }} />


                                        }
                                        <div className="buttons-container">
                                            <SVGContainer
                                                callback={() => { noEdit() }}
                                                className={"button-container"}
                                                Component={Watch} />
                                            <SVGContainer
                                                callback={saveToDB}
                                                className={"button-container"}
                                                Component={Save} />
                                        </div>
                                    </form>
                                </li>
                        )
                    }
                </ul>
            </div>
        </>
    )
}

export default MyCourse