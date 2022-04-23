import { useState, useContext,useEffect } from 'react';
import { validatePassword, validateUsername, validateName, validateEmail } from '../../utils/validation'
import { LoginContext } from '../../context/LoginContext'
import { registerNewStudent } from '../../api/professor'

const RegisterStudentForm = (props) => {
    const [inputClasses, setInputClasses] = useState(["", "", "", "", "", ""])
    const [invalidMessages, setInvalidMessages] = useState(["", "", "", "", "", ""])
    const [validInputs, setValidInputs] = useState([false, false, false, false, false])
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [password, setPassword] = useState("")
    const { userData } = useContext(LoginContext)

    const controller = new AbortController()

    useEffect(() => {

        return () => {
            controller.abort();
          };

    },[])

    const isFormInvalid = () => {
        return validInputs.includes(false)
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

    const onBlurUsername = (event) => {
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

    const onBlurEmail = (event) => {
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

    const onBlurBirthDate = (event) => {
        const inputBirthDate = event.target.value.trim()
        validateInput(
            inputBirthDate,
            2,
            (value) => true,
            setBirthDate,
            "BirthDate is required",
            "Invalid Date"
        );
    }

    const onBlueFirstName = (event) => {
        const inputFirstName = event.target.value.trim()
        validateInput(
            inputFirstName,
            3,
            validateName,
            setFirstname,
            "First name is required",
            "Invalid First name"
        );
    }

    const onBlueLastName = (event) => {
        const inputLastName = event.target.value.trim()
        validateInput(
            inputLastName,
            4,
            validateName,
            setLastname,
            "Last name is required",
            "Invalid Last name"
        );
    }

    const onBlurPassword = (event) => {
        const inputPassword = event.target.value.trim()
        validateInput(
            inputPassword,
            5,
            validatePassword,
            setPassword,
            "Password is required",
            "Invalid password"
        );
    }

    const onBlurPasswordRep = (event) => {
        const inputPassword = event.target.value.trim()
        const isValidPasswordRep = value => value === password
        validateInput(
            inputPassword,
            6,
            isValidPasswordRep,
            () => { },
            "Passwords is required twice",
            "Passwords have to match"
        );
    }

    const onSubmitForm = async event => {
        event.preventDefault();
        try {
            const studentData = {
                username,
                email,
                firstname,
                lastname,
                dateofbirth: birthDate,
                password
            }
            const token = userData.token
            const newStudent = await registerNewStudent(token, studentData,controller.signal)
            alert('student was added to the system')
        } catch (err) {
            alert('Could not add this student to the system')
        }
    }


    return (
        <div className="add-student__form">
            <h1> Register User</h1>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="username">Username</label>
                <input id="username" placeholder="Username" className={inputClasses[0]} onChange={onBlurUsername} />
                {invalidMessages[0] !== "" && <div className="invalid-message">{invalidMessages[0]}</div>}
                <label htmlFor="Email">Email</label>
                <input id="Email" placeholder="Email" type="email" className={inputClasses[1]} onChange={onBlurEmail} />
                {invalidMessages[1] !== "" && <div className="invalid-message">{invalidMessages[1]}</div>}
                <label htmlFor="BD">Birth Date</label>
                <input id="BD" placeholder="Birth Date" type="date" className={inputClasses[2]} onChange={onBlurBirthDate} />
                {invalidMessages[2] !== "" && <div className="invalid-message">{invalidMessages[2]}</div>}
                <label htmlFor="fname">First Name</label>
                <input id="fname" placeholder="First name" type="text" className={inputClasses[3]} onChange={onBlueFirstName} />
                {invalidMessages[3] !== "" && <div className="invalid-message">{invalidMessages[3]}</div>}
                <label htmlFor="lname">Last Name</label>
                <input id="lname" placeholder="Last name" type="text" className={inputClasses[4]} onChange={onBlueLastName} />
                {invalidMessages[4] !== "" && <div className="invalid-message">{invalidMessages[4]}</div>}
                <label htmlFor="password">Password</label>
                <input id="password" placeholder="Password" type="password" className={inputClasses[5]} onChange={onBlurPassword} />
                {invalidMessages[5] !== "" && <div className="invalid-message">{invalidMessages[5]}</div>}
                <label htmlFor="rpassword">Repeat Password</label>
                <input id="rpassword" placeholder="Repeat password" type="password" className={inputClasses[6]} onChange={onBlurPasswordRep} />
                {invalidMessages[6] !== "" && <div className="invalid-message">{invalidMessages[6]}</div>}
                <button type="submit" disabled={isFormInvalid()}>Submit</button>
            </form>

        </div>
    )
}

export default RegisterStudentForm;