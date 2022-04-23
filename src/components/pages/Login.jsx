import { useContext } from 'react'
import { MediaContext } from '../../context/MediaContext'
import LoginForm from '../login/LoginForm';



const LoginPage = (props) => {

    const { isMobile } = useContext(MediaContext)

    const assignClassName = className => isMobile ? `${className} mobile` : className



    return (
        <main className={assignClassName('')}>
            <div className="login-page">
                <div className={assignClassName("login-page__form")}>
                    <LoginForm />
                </div>
            </div>
        </main>
    )
}

export default LoginPage
