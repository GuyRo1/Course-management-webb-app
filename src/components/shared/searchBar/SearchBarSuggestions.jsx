import { useState, useEffect } from 'react';

const SuggestionBox = ({ setChoice, suggestions, showedSuggestions, onClickMoreSuggestions }) => {


    const maxSuggestions = showedSuggestions
    const [suggestionsToShow, setSuggestionsToShow] = useState(suggestions)
    const [moreSuggestions, setMoreSuggestions] = useState(false)

    useEffect(() => {
        if (!!suggestions.length && suggestionsToShow.length > maxSuggestions) {
            setSuggestionsToShow([...suggestionsToShow].slice(0, maxSuggestions - 1))
            setMoreSuggestions(true)
        }
    }, [maxSuggestions, suggestionsToShow, setSuggestionsToShow, setMoreSuggestions, suggestions])

    return (
        <div>
            <ul>
                {suggestions.length !== 0 &&
                    suggestions.map(suggestion => (
                        <li
                            key={suggestion.key}
                            onClick={event => {
                                event.preventDefault()
                                setChoice(suggestion.object);
                            }}
                        >
                            {suggestion.value}
                        </li>
                    ))}
                {moreSuggestions
                    &&
                    <li
                        key="XXYYXXZZAA12"
                        onClick={onClickMoreSuggestions}
                    >
                        All suggestions
                    </li>}
            </ul>
        </div>
    )
}

export default SuggestionBox




