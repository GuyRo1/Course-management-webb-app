import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import { validateUsername, validatePassword } from '../../utils/validation'
import { loginProfessorAction, loginStudentAction } from '../../actions/loginActions'
import { loginProfessor } from '../../api/professor'
import { loginStudent } from '../../api/student'

const LoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isEmailInputValid, setIsUsernameInputValid] = useState(true);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [isStudentLogin, setIsStudentLogin] = useState(true);

    const { userDataDispatch } = useContext(LoginContext)

    const controller = new AbortController()

    useEffect(() => {

        return () => {
            controller.abort();
        };

    }, [])

    const chooseUserType = (isStudent) => {
        return (isStudentLogin && isStudent) || (!isStudentLogin && !isStudent) ? "active" : ""
    }

    const toggleUserType = () => {
        setIsStudentLogin(!isStudentLogin)
    }

    const navigate = useNavigate()
    const onBlurPasswordEvent = event => {
        const inputPassword = event.target.value
        const inputPasswordValid = validatePassword(inputPassword)

        setPassword(inputPasswordValid ? inputPassword : "");
        setIsPasswordInputValid(inputPasswordValid);
    }

    const onBlurUsernameEvent = event => {
        const inputUsername = event.target.value
        const inputUsernameValid = validateUsername(inputUsername)

        setUsername(inputUsernameValid ? inputUsername : "");
        setIsUsernameInputValid(inputUsernameValid);
    }

    const isFormInvalid = () => !(!!username && !!password)

    const onSubmitForm = async event => {
        event.preventDefault()
        try {
            if (isStudentLogin) {
                const studentData = await loginStudent({ username, password }, controller.signal)
                userDataDispatch(loginStudentAction({ user: studentData.user, token: studentData.token }))
                localStorage.setItem('cms-web-app-token', JSON.stringify({
                    type: "student",
                    token: studentData.token
                }))
            } else {
                const professorData = await loginProfessor({ username, password }, controller.signal)
                userDataDispatch(loginProfessorAction({ user: professorData.user, token: professorData.token }))
                localStorage.setItem('cms-web-app-token', JSON.stringify({
                    type: "professor",
                    token: professorData.token
                }))
            }

            navigate('/home')
        } catch (err) {
            alert('wrong username or password')
        }
    }

    return (
        <div className="login-form">
            <h1> Login</h1>
            <form onSubmit={onSubmitForm}>
                <div className="choose-user-type-container">
                    <div className={chooseUserType(false)} onClick={toggleUserType}>
                        Professor
                    </div>
                    <div className={chooseUserType(true)} onClick={toggleUserType}>
                        Student
                    </div>
                </div>
                <label htmlFor="username">username</label>
                <input placeholder="Username" onBlur={onBlurUsernameEvent} id="username" />
                {!isEmailInputValid && <div className="invalid-message">Invalid email</div>}
                <label htmlFor="password">password</label>
                <input placeholder="Password" onBlur={onBlurPasswordEvent} id="password" />
                {!isPasswordInputValid && <div className="invalid-message">Invalid password</div>}
                <button type="submit" disabled={isFormInvalid()}>Log In</button>
            </form>

        </div>
    )
}

export default LoginForm