
import CentralMessage from '../shared/CentralMessage'
import { useContext } from 'react'
import { MediaContext } from '../../context/MediaContext'


const PageNotFound = () => {

    const {isMobile} = useContext(MediaContext)

    const assignClassName = className => isMobile ? `${className} mobile` : className


    return (
        <main className={assignClassName('')}>
        <CentralMessage message="404 Page Not Found" />
        </main>
    )
}

export default PageNotFound;