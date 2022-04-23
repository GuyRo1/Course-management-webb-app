
import CentralMessage from '../shared/CentralMessage'
import { useContext } from 'react'
import { MediaContext } from '../../context/MediaContext'

const Home = () => {

    const {isMobile} = useContext(MediaContext)

    const assignClassName = className => isMobile ? `${className} mobile` : className

    return (
        <main className={assignClassName('')}>
            <CentralMessage message="Course Management System" shortMessage="C - M - S" />
        </main>
    )
}

export default Home;