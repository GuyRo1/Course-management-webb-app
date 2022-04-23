import { Slide as Animation } from "react-awesome-reveal"
import { useNavigate } from 'react-router-dom'
import { useContext} from 'react'
import { LoginContext } from '../../context/LoginContext'
import { logoutAction } from '../../actions/loginActions'




function MobileMenu({ menuLinks, setMobileMenuStatus }) {

    const navigate = useNavigate()

    const { userData, userDataDispatch } = useContext(LoginContext)

    const executeMenuItemAction = (event, type, url, action) => {
        event.preventDefault()
        setMobileMenuStatus(false)
        if (type === "link")
            navigate(url)
        else {
            switch (action) {
                case "logout": {
                    userDataDispatch(logoutAction())
                    localStorage.removeItem('cms-web-app-token')
                    navigate('/home')
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    return (
        <div className="mobile-menu-container">
            <Animation duration={500} direction="right" className="mobile-menu">
                <div className="links-container">
                    {
                        menuLinks.map(item => (
                            <div className="mobile-link"
                                key={item.key}
                                onClick={(event) => {
                                    executeMenuItemAction(event, item.type, item.url, item.action)
                                }}
                            >
                                {item.type === "link" ?
                                    <a href={item.url}>{item.text}</a> :
                                    <div className="non-link-menu-item">{item.text}</div>
                                }
                                <div className="separator"></div>
                            </div>
                        ))
                    }
                </div>
            </Animation>
        </div >



    )
}

export default MobileMenu;
