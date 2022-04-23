import { createContext} from "react"
import {useMediaQuery} from 'react-responsive'


export const MediaContext = createContext()

const MediaContextProvider = (props) => {

    const isMobile = useMediaQuery({
        query : '(max-width: 600px)'
    }) 

   // const isMobile = true

    return(
        <MediaContext.Provider value={{ isMobile }}>
            {props.children}
        </MediaContext.Provider>
    )
}


export default MediaContextProvider