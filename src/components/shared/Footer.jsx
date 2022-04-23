
import { useMediaQuery } from 'react-responsive'




function Footer() {


    const isMobile = useMediaQuery({
        query: '(max-width: 900px)'
    })

    const assignClassName = className => isMobile ? `${className} mobile` : className


    return (
        <footer>
            
        </footer>
    )
}

export default Footer;
