import { useContext, useEffect, useState } from 'react'
import { MediaContext } from '../../context/MediaContext'
import { useParams, useNavigate } from 'react-router-dom'
import { LoginContext } from './../../context/LoginContext';
import searchStudents from '../../utils/getStudentsBySearchTerm'

const Student = () => {

    const { isMobile } = useContext(MediaContext)

    const { userData } = useContext(LoginContext)

    const navigate = useNavigate()

    const searchTerm = useParams().searchTerm

    const [searchResults, setSearchResults] = useState({
        searchTerm: "",
        suggestions: []
    })

    useEffect(() => {

        async function fetchData(signal) {
            try {
                const response = await searchStudents(userData, "", searchTerm,signal)
                setSearchResults(response)
            } catch {
            }
        }
        const controller = new AbortController()
        if (userData.type === "professor")
            fetchData(controller.signal);
        else {
        }

        return () => {
            controller.abort();
        };

    }, [searchTerm, userData, setSearchResults])

    const assignClassName = className => isMobile ? `${className} mobile` : className

    return (
        <main className={assignClassName('search-page')}>
            {!!searchResults.searchTerm &&
                <div className="search-term">{searchResults.searchTerm}</div>
            }
            {searchResults.suggestions.length !== 0 &&
                searchResults.suggestions.map(suggestion => (
                    <li key={suggestion.key}
                        onClick={(event) => {
                            event.preventDefault()
                            navigate(`/students/${suggestion.object.id}`)
                        }}
                    >
                        {suggestion.value}
                    </li>
                ))
            }
        </main>
    )
}

export default Student;