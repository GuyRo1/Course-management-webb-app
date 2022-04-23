import SearchBar from '../shared/searchBar/SearchBar'
import { LoginContext } from '../../context/LoginContext'
import getStudents from '../../utils/getStudentsBySearchTerm'
import { useContext, useState, useEffect } from 'react'
const StudentsSearchBar = (props) => {

    const sendResult = props.sendResult

    const { userData } = useContext(LoginContext)

    const [searchResult, setSearchResult] = useState({
        type: "empty",
        result: ''
    })

    const getStudentsBySearchTerm = async (src = "", searchTerm) => {
        try {
            return await getStudents(userData, src, searchTerm)
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
            className="students-search-bar"
            src=""
            getter={getStudentsBySearchTerm}
            sendChoice={setChoice}
            sendSuggestions={setSuggestions}
            placeholder="Search for students"
        />

    )
}

export default StudentsSearchBar