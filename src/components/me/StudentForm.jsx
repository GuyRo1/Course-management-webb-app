import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { validateUsername, validateName, validateEmail } from '../../utils/validation'
import { LoginContext } from '../../context/LoginContext'
import { changeMyData } from '../../api/student'
import { loginStudentAction } from '../../actions/loginActions'

const StudentForm = (props) => {
    const [inputClasses, setInputClasses] = useState(["", "", "", "", ""])
    const [invalidMessages, setInvalidMessages] = useState(["", "", "", "", ""])
    const [validInputs, setValidInputs] = useState([false, false, false, false, false])
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [dateofbirth, setDateOfBirth] = useState("")
    const { userData, userDataDispatch } = useContext(LoginContext)
    const navigate = useNavigate()

    const controller = new AbortController()

    useEffect(() => {

        return () => {
            controller.abort();
          };

    },[])

    useEffect(() => {
        if (userData.type === "student") {
            setInputClasses(["", "", "", "", ""])
            setInvalidMessages(["", "", "", "", ""])
            setValidInputs([true, true, true, true, true])
            setUsername(userData.user.username)
            setEmail(userData.user.email)
            setFirstname(userData.user.firstname)
            setLastname(userData.user.lastname)
            setDateOfBirth(userData.user.dateofbirth)
        }


    }, [props.showOnly, userData])


    const dataChanged = () => {
        return (
            userData.user.username !== username ||
            userData.user.email !== email ||
            userData.user.firstname !== firstname ||
            userData.user.firstname !== lastname
        )
    }


    const isFormInvalid = () => {
        return validInputs.includes(false) || !dataChanged()
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
                setValue(value)
            }
        } else {
            setStateOfInputs(missingValueMessage, "input-invalid", false)
            setValue(value)
        }
    }

    const onChangeUsername = (event) => {
        const inputUsername = event.target.value.trim()
        validateInput(
            inputUsername,
            0,
            validateUsername,
            setUsername,
            "Username is required",
            "Invalid Username"
        );
    }

    const onChangeEmail = (event) => {
        const inputEmail = event.target.value.trim()
        validateInput(
            inputEmail,
            1,
            validateEmail,
            setEmail,
            "Email is required",
            "Invalid Email Address"
        );
    }

    const onChangeFirstName = (event) => {
        const inputFirstName = event.target.value.trim()
        validateInput(
            inputFirstName,
            2,
            validateName,
            setFirstname,
            "First name is required",
            "Invalid First name"
        );
    }

    const onChangeLastName = (event) => {
        const inputLastName = event.target.value.trim()
        validateInput(
            inputLastName,
            3,
            validateName,
            setLastname,
            "Last name is required",
            "Invalid Last name"
        );
    }

    const onChangeBirthDate = (event) => {
        const inputDateOfBirth = event.target.value.trim()
        validateInput(
            inputDateOfBirth,
            4,
            (value) => true,
            setDateOfBirth,
            "Last name is required",
            "Invalid Last name"
        );
    }

    const onSubmitForm = async event => {
        event.preventDefault();
        try {
            const changeData = {
                userId: userData.user.id,
                username,
                email,
                firstname,
                lastname,
                dateofbirth
            }
            const token = userData.token
            const updatedUser = await changeMyData(token, changeData,controller.signal)
            userDataDispatch(loginStudentAction({ user: updatedUser, token: userData.token }))
            navigate('/home')
        } catch (err) {
            alert('Could not update data')
        }
    }


    return (
        <div className="professor-user-data-form">
            <h1> {`${userData.user.firstname} ${userData.user.lastname}`}</h1>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="username">Username</label>
                <input id="username" value={username} disabled={props.showOnly} placeholder="Username" className={inputClasses[0]} onChange={onChangeUsername} />
                {invalidMessages[0] !== "" && <div className="invalid-message">{invalidMessages[0]}</div>}
                <label htmlFor="Email">Email</label>
                <input id="Email" value={email} disabled={props.showOnly} placeholder="Email" type="email" className={inputClasses[1]} onChange={onChangeEmail} />
                {invalidMessages[1] !== "" && <div className="invalid-message">{invalidMessages[1]}</div>}
                <label htmlFor="fname">First Name</label>
                <input id="fname" value={firstname} disabled={props.showOnly} placeholder="First name" type="text" className={inputClasses[2]} onChange={onChangeFirstName} />
                {invalidMessages[2] !== "" && <div className="invalid-message">{invalidMessages[2]}</div>}
                <label htmlFor="lname">Last Name</label>
                <input id="lname" value={lastname} disabled={props.showOnly} placeholder="Last name" type="text" className={inputClasses[3]} onChange={onChangeLastName} />
                {invalidMessages[3] !== "" && <div className="invalid-message">{invalidMessages[3]}</div>}
                <label htmlFor="bdate">Birth Date</label>
                <input id="bdate" value={dateofbirth} disabled={props.showOnly} placeholder="Date of birth" type="date" className={inputClasses[4]} onChange={onChangeBirthDate} />
                {invalidMessages[4] !== "" && <div className="invalid-message">{invalidMessages[4]}</div>}
                {!props.showOnly && <button type="submit" disabled={isFormInvalid()}>Submit</button>}
            </form>
        </div>
    )
}

export default StudentForm;