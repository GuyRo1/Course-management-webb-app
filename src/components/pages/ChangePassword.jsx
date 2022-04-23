import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import { validatePassword } from '../../utils/validation'
import { MediaContext } from '../../context/MediaContext'
import { changeMyPassProf } from '../../api/professor'
import { changeMyPassStudent } from '../../api/student'



const ChangePassword = () => {

    const controller = new AbortController()

    useEffect(() => {

        return () => {
            controller.abort();
        };

    }, [])

    const [password, setPassword] = useState("")
    const [passRepeat, setPassRepeat] = useState("")
    const [newPass, setNewPass] = useState("")
    const [wrongPassword, setWrongPassword] = useState(false)

    const { userData } = useContext(LoginContext)

    const navigate = useNavigate()

    const onBlurPassword = (event) => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    const onBlurPassRepeat = (event) => {
        event.preventDefault()
        setPassRepeat(event.target.value)
    }

    const onBlurNewPass = (event) => {
        event.preventDefault()
        if (validatePassword(event.target.value)) {
            setWrongPassword(false)
            setNewPass(event.target.value)
        } else {
            setWrongPassword(true)
        }
    }

    const onSubmitForm = async event => {
        event.preventDefault()
        try {
            switch (userData.type) {
                case 'professor':
                    changeMyPassProf(userData.token, password, newPass, controller.signal)
                    break;
                case 'student':
                    changeMyPassStudent(userData.token, password, newPass, controller.signal)
                    break;
                default:
                    break;
            }

            navigate('/home')
        } catch (err) {
            //notify the user he didn't logged in
        }
    }

    const isFormInvalid = () => {
        return !password || password !== passRepeat || !newPass

    }

    const { isMobile } = useContext(MediaContext)

    const assignClassName = className => isMobile ? `${className} mobile` : className

    return (
        <main className={assignClassName('')}>
            <div className={assignClassName('change-password-container')}>
                <form onSubmit={onSubmitForm}>
                    <h1> Change Password</h1>
                    <label htmlFor="password">Current password</label>
                    <input placeholder="password" onBlur={onBlurPassword} id="password" />
                    <label htmlFor="pass-repeat">Repeat current password</label>
                    <input placeholder="pass-repeat" onBlur={onBlurPassRepeat} id="pass-repeat" />
                    <label htmlFor="new-pass">Type your new password</label>
                    <input placeholder="new-pass" onBlur={onBlurNewPass} id="new-pass" />
                    {wrongPassword && <div className="invalid-pass">invalid password</div>}
                    <button type="submit" disabled={isFormInvalid()}>Change password</button>
                </form>
            </div>
        </main>
    )
}
export default ChangePassword