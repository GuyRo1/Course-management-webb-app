import { useState, useReducer, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MediaContext } from '../../context/MediaContext'
import { LoginContext } from '../../context/LoginContext'
import MobileMenuButton from './MobileMenuButton'
import { ReactComponent as Logo } from '../../assets/svg/logo.svg'
import SVGContainer from './SvgContainer'
import MobileMenu from './MobileMenu'
import menuReducer, { initialMenu } from '../../reducers/menuReducer'
import { displayVisitorMenu, displayProfessorMenu, displayStudentMenu } from '../../actions/menuActions'

function Header() {

  const navigate = useNavigate()

  const [menuLinks, setMenuLinks] = useReducer(menuReducer, initialMenu)

  const [mobileMenuStatus, setMobileMenuStatus] = useState(false)

  const { isMobile } = useContext(MediaContext)

  const { userData} = useContext(LoginContext)


  useEffect(() => {
    switch (userData.type) {
      case 'student': {
        setMenuLinks(displayStudentMenu())
        break;
      }
      case 'professor': {
        setMenuLinks(displayProfessorMenu())
        break;
      }
      default: {
        setMenuLinks(displayVisitorMenu())
        break;
      }
    }
  }, [userData, setMenuLinks])

  const navigateHome = () => {
    navigate('/home')
    setMobileMenuStatus(false)
  }

  const assignClassName = className => isMobile ? `${className} mobile` : className

  return (
    <header className={assignClassName("header")}>
      <SVGContainer
        callback={navigateHome}
        className={assignClassName("logo-container")}
        Component={Logo} />
      <MobileMenuButton mobileMenuStatus={mobileMenuStatus} setMobileMenuStatus={setMobileMenuStatus} />
      {!!mobileMenuStatus &&
        <MobileMenu menuLinks={menuLinks} setMobileMenuStatus={setMobileMenuStatus} />
      }
    </header>
  )
}

export default Header;
