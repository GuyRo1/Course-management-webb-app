import { useContext } from 'react'
import { MediaContext } from '../../context/MediaContext'

const CentralMessage = ({ shortMessage, message }) => {

    const { isMobile } = useContext(MediaContext)

    const assignClassName = className => isMobile ? `${className} mobile` : className

    return (
        <div className={assignClassName("central-message-page-layout")}>
            <div>
                {isMobile && !!shortMessage ?
                    shortMessage :
                    message
                }
            </div>
        </div>
    )
}

export default CentralMessage;