import SearchBarInput from './SearchBarInput'
import SearchBarSuggestions from './SearchBarSuggestions'
import { useState, useEffect } from 'react';


const SearchBar = (props) => {

    const src = props.src
    const getSuggestions = props.getter
    const sendSuggestions = props.sendSuggestions
    const sendChoice = props.sendChoice
    const placeholder = props.placeholder
    const searchBarClassName = props.className
    const showedSuggestions = props.showedSuggestions

    const [searchTerm, setSearchTerm] = useState("")

    const [suggestions, setSuggestions] = useState({
        searchTerm: "",
        suggestions: []
    })

    const [sendOutData, setSendOutData] = useState({ type: "no-action", payload: "" })

    const initializeSendOutData = () => {
        setSendOutData({ type: "no-action", payload: "" })
    }

    const setSendSuggestions = suggestions => {
        setSendOutData({
            type: "suggestions",
            payload: suggestions
        })
    }

    const setSendChoice = choice => {
        setSendOutData({
            type: "choice",
            payload: choice
        })
    }

    const onFormSubmit = () => {
        setSendSuggestions(suggestions)
    }

    const onChoicePicked = choice => {
        setSendChoice(choice)
    }


    //get new suggestions when searchTerm changes
    useEffect(() => {
        async function fetchData() {
            try {
                if (suggestions.searchTerm !== searchTerm) {
                    const response = await getSuggestions(src, searchTerm)
                    setSuggestions(response)
                }
            } catch {
            }
        }

        fetchData();



    }, [searchTerm,
        suggestions.searchTerm,
        setSuggestions,
        src,
        getSuggestions]);

    //send data outside using callbacks
    useEffect(() => {
        switch (sendOutData.type) {
            case "no action":
                break;
            case "choice":
                sendChoice(sendOutData.payload)
                initializeSendOutData()
                break;
            case "suggestions":
                sendSuggestions(sendOutData.payload)
                initializeSendOutData()
                break;
            default:
                break;
        }
    }, [sendChoice, sendSuggestions, sendOutData])

    return (
        <div className={`search ${searchBarClassName}`}>
            <SearchBarInput
                placeholder={placeholder}
                sendSearchTerm={setSearchTerm}
                onSubmit={onFormSubmit} />

            {suggestions.suggestions.length !== 0 &&
                <SearchBarSuggestions
                    onClickMoreSuggestions = {onFormSubmit}
                    showedSuggestions={showedSuggestions}
                    suggestions={suggestions.suggestions}
                    setChoice={onChoicePicked} />
            }

        </div>
    )

}

export default SearchBar