
import { searchCourses } from './../api/professor.js';

const getCoursesBySearchTerm = async (userData, src = "", searchTerm) => {
    try {
        const response = {
            searchTerm,
            suggestions: []
        }
        const search = {}
        if(searchTerm!=='all-courses')
        search.nameContains = searchTerm
        if (search.nameContains !== "") {
            const coursesRawData = await searchCourses(userData.token, search)
            response.suggestions = coursesRawData.map((course, index) => (
                {
                    key: index,
                    object: course,
                    value: `${course.name}`
                }
            )

            )
        }
        return response
    } catch (err) {
        throw err
    }


}

export default getCoursesBySearchTerm