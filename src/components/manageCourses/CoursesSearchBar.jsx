import SearchBar from '../shared/searchBar/SearchBar'
import getCourses from '../../utils/getCoursesBySearchTerm'
import { LoginContext } from '../../context/LoginContext'
import { useContext, useState, useEffect } from 'react'
const StudentsSearchBar = (props) => {

    const sendResult = props.sendResult

    const { userData } = useContext(LoginContext)

    const [searchResult, setSearchResult] = useState({
        type: "empty",
        result: ''
    })

    const getCoursesBySearchTerm = async (src = "", searchTerm) => {
        try {
            return await getCourses(userData, src, searchTerm)
        } catch (err) {
            throw err
        }


    }

    const setChoice = result => {
        setSearchResult({
            type: 'choice',
            result
        })
    }

    const setSuggestions = result => {
        setSearchResult({
            type: 'suggestions',
            result
        })
    }

    useEffect(() => {
        switch (searchResult.type) {
            case 'choice': {
                sendResult(searchResult)
                setSearchResult({
                    type: "empty",
                    result: ''
                })
                break;
            }
            case 'suggestions': {
                sendResult(searchResult)
                setSearchResult({
                    type: "empty",
                    result: ''
                })
                break;
            }
            case 'empty': {
                break;
            }
            default: {
                break;
            }
        }
    }, [searchResult, setSearchResult, sendResult])

    return (
        <SearchBar
            className="course-search-bar"
            src=""
            getter={getCoursesBySearchTerm}
            sendChoice={setChoice}
            sendSuggestions={setSuggestions}
            placeholder="Search for courses"
        />
    )
}

export default StudentsSearchBar