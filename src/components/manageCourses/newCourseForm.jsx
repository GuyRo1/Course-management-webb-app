import { useState, useContext, useEffect } from 'react';
import { validateName } from '../../utils/validation'
import { LoginContext } from '../../context/LoginContext'
import { addNewCourse } from '../../api/professor'



const RegisterStudentForm = (props) => {
    const [inputClasses, setInputClasses] = useState(["", "", "", "", ""])
    const [invalidMessages, setInvalidMessages] = useState(["", "", "", "", ""])
    const [daysChosen, setDaysChosen] = useState([false, false, false, false, false, false, false])
    const [validInputs, setValidInputs] = useState([false, false, false, false, false])
    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const { userData } = useContext(LoginContext)

    const controller = new AbortController()

    useEffect(() => {

        return () => {
            controller.abort();
        };

    }, [])

    const isFormInvalid = () => {
        return validInputs.includes(false) || !daysChosen.includes(true)
    }

    const validateInput = (
        value,
        inputIndex,
        validatorFunc,
        setValue,
        missingValueMessage,
        invalidValueMessage
    ) => {
        const setStateOfInputs = (message, inputClass, isValidInput) => {
            const newInvalidValueMessages = [...invalidMessages];
            const newInputClasses = [...inputClasses];
            const newIsValidInputs = [...validInputs];
            newInvalidValueMessages[inputIndex] = message
            setInvalidMessages(newInvalidValueMessages)
            newInputClasses[inputIndex] = inputClass
            setInputClasses(newInputClasses);
            newIsValidInputs[inputIndex] = isValidInput
            setValidInputs(newIsValidInputs)
        }
        if (value.length > 0) {
            if (validatorFunc(value)) {
                setStateOfInputs("", "", true)
                setValue(value)
            } else {
                setStateOfInputs(invalidValueMessage, "input-invalid", false)
            }
        } else {
            setStateOfInputs(missingValueMessage, "input-invalid", false)
        }
    }

    const onChangeCheckBox = (event) => {
        const days = [...daysChosen]
        days[event.target.id - 1] = event.target.checked
        setDaysChosen(days)
    }

    const onBlurCourseName = (event) => {
        const inputCourseName = event.target.value.trim()
        validateInput(
            inputCourseName,
            0,
            validateName,
            setName,
            "Course name is required",
            "Invalid Course name"
        );
    }

    const onBlurStartDate = (event) => {
        const inputStartDate = event.target.value.trim()
        const validateStartDate = (value) => {
            const chosenDate = new Date(value)
            return chosenDate > new Date("01.01.2020")
        }
        validateInput(
            inputStartDate,
            1,
            validateStartDate,
            setStartDate,
            "Start date is required",
            "Invalid Start date"
        );
    }

    const onBlurEndDate = (event) => {
        const inputEndDate = event.target.value.trim()
        const validateEndDate = (value) => {
            const chosenDate = new Date(value)
            return chosenDate > Date.now()
        }
        validateInput(
            inputEndDate,
            2,
            validateEndDate,
            setEndDate,
            "End date is required",
            "Invalid End date"
        );
    }

    const onBlurStartTime = (event) => {
        const inputStartTime = event.target.value.trim()
        validateInput(
            inputStartTime,
            3,
            () => true,
            setStartTime,
            "End date is required",
            "Invalid End date"
        );
    }

    const onBlurEndTime = (event) => {
        const inputEndTime = event.target.value.trim()
        validateInput(
            inputEndTime,
            4,
            () => true,
            setEndTime,
            "End date is required",
            "Invalid End date"
        );
    }

    const daysChosenFormat = (daysChosen) => {
        const daysOfWeek = []
        for (let i = 0; i < 7; i++) {
            if (daysChosen[i])
                daysOfWeek.push({ day: i })
        }
        return daysOfWeek
    }

    const onSubmitForm = async event => {
        event.preventDefault();
        const courseData = {
            name: name,
            startdate: startDate,
            enddate: endDate,
            startTime: startTime,
            endTime: endTime,
            daysofweek: daysChosenFormat(daysChosen)
        }
        try {
            const token = userData.token
            await addNewCourse(token, courseData, controller.signal)
            props.navigateAfterSubmission()

        } catch (err) {
            alert('Could not add this course to the system')
        }
    }

    return (
        <div className="manage-courses-page__form">
            <h1> New Course</h1>
            <form id="add-new-course" onSubmit={onSubmitForm}>
                <label htmlFor="name">Username</label>
                <input id="name" placeholder="name" className={inputClasses[0]} onChange={onBlurCourseName} />
                {invalidMessages[0] !== "" && <div className="invalid-message">{invalidMessages[0]}</div>}
                <label htmlFor="StartDate">Start Date</label>
                <input id="StartDate" placeholder="Start Date" type="date" className={inputClasses[1]} onChange={onBlurStartDate} />
                {invalidMessages[1] !== "" && <div className="invalid-message">{invalidMessages[1]}</div>}
                <label htmlFor="EndDate">End Date</label>
                <input id="EndDate" placeholder="End Date" type="date" className={inputClasses[2]} onChange={onBlurEndDate} />
                {invalidMessages[2] !== "" && <div className="invalid-message">{invalidMessages[2]}</div>}
                <label htmlFor="StartTime">Start Time</label>
                <input id="StartTime" placeholder="Start Time" type="time" className={inputClasses[3]} onChange={onBlurStartTime} />
                {invalidMessages[3] !== "" && <div className="invalid-message">{invalidMessages[3]}</div>}
                <label htmlFor="EndTime">End Date</label>
                <input id="EndTime" placeholder="End Time" type="time" className={inputClasses[4]} onChange={onBlurEndTime} />
                {invalidMessages[4] !== "" && <div className="invalid-message">{invalidMessages[4]}</div>}
                <div className="checkbox-container">
                    <div id="sunday-text">Sun.</div>
                    <div id="monday-text"> Mon.</div>
                    <div id="Tuesday-text">Tue.</div>
                    <div id="wensdey-text">Wed.</div>
                    <div id="thursday-text">Thu.</div>
                    <div id="friday-text">Fri.</div>
                    <div id="saturday-text">Sat.</div>
                    <input onChange={onChangeCheckBox} id="1" type="checkbox"></input>
                    <input onChange={onChangeCheckBox} id="2" type="checkbox"></input>
                    <input onChange={onChangeCheckBox} id="3" type="checkbox"></input>
                    <input onChange={onChangeCheckBox} id="4" type="checkbox"></input>
                    <input onChange={onChangeCheckBox} id="5" type="checkbox"></input>
                    <input onChange={onChangeCheckBox} id="6" type="checkbox"></input>
                    <input onChange={onChangeCheckBox} id="7" type="checkbox"></input>

                </div>
                <button type="submit" disabled={isFormInvalid()}>Submit</button>
            </form>

        </div>
    )
}

export default RegisterStudentForm;