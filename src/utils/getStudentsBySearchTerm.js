
import { searchStudents } from '../api/professor.js'

const getStudentsBySearchTerm = async (userData, src = "", searchTerm) => {
    try {
        const response = {
            searchTerm,
            suggestions: []
        }
        const search = {}
        let searchArray = []
        if (searchTerm === 'all-students') {
            search.everyone = true
        } else if (searchTerm.includes(" ")) {
            searchArray = searchTerm.split(" ")
            search.firstNameContains = searchArray[0]
            search.lastNameContains = searchArray[1]
        } else {
            search.nameContains = searchTerm
        }
        if (search !== {}) {
            const studentsRawData = await searchStudents(userData.token, search)
            response.suggestions = studentsRawData.map((student, index) => (
                {
                    key: index,
                    object: student,
                    value: `${student.firstname} ${student.lastname}`
                }
            ))
        }
        return response
    } catch (err) {
        throw err
    }
}

export default getStudentsBySearchTerm