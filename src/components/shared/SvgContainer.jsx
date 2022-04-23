//import { useNavigate } from 'react-router-dom'

const SVGContainer = ({ callback, input, className, Component }) => {



    const onClickDefault = () => { }

    const onClickCallback = async (callback, input) => {

        await callback({ ...input })
    }


    return <div className={className} onClick={!!callback ?
        event => {
            event.preventDefault()
            if (!!input)
                onClickCallback(callback, input)
            else
                onClickCallback(callback)
        }
        : onClickDefault}>
        <Component />
    </div>
}

export default SVGContainer;