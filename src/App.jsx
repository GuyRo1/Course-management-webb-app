import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import MediaContextProvider from './context/MediaContext'
import LoginContextProvider from './context/LoginContext'
import MainLoader from './components/shared/MainLoader'

const ProfessorRoute = lazy(() => import('./routers/ProfessorRoute'));
const StudentRoute = lazy(() => import('./routers/StudentRoute'));
const VisitorRoute = lazy(() => import('./routers/VisitorRoute'));
const UserRoute = lazy(() => import('./routers/UserRoute'));
const Header = lazy(() => import('./components/shared/Header'));
const Footer = lazy(() => import('./components/shared/Footer'));
const Login = lazy(() => import('./components/pages/Login'));
const Home = lazy(() => import('./components/pages/Home'));
const ManageStudents = lazy(() => import('./components/pages/ManageStudents'));
const Student = lazy(() => import('./components/pages/Student'));
const Course = lazy(() => import('./components/pages/Course'));
const ManageCourses = lazy(() => import('./components/pages/ManageCourses'));
const PageNotFound = lazy(() => import('./components/pages/PageNotFound'));
const StudentSearch = lazy(() => import('./components/pages/StudentSearch'));
const CourseSearch = lazy(() => import('./components/pages/CourseSearch'));
const MyCourses = lazy(() => import('./components/pages/MyCourses'));
const Me = lazy(() => import('./components/pages/Me'));
const ChangePassword = lazy(() => import('./components/pages/ChangePassword'));




function App() {


  return (
    <BrowserRouter>
      <MediaContextProvider>
        <LoginContextProvider>
          <Suspense fallback={<MainLoader/>}>
            <Header />
            <Routes>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<Home />} />
              <Route element={<VisitorRoute />}>
                <Route path='/login' element={<Login />} />
              </Route>
              <Route element={<ProfessorRoute />}>
                <Route path='/manage-students' element={<ManageStudents />} />
                <Route path='/manage-courses' element={<ManageCourses />} />
                <Route path='/students/:studentId' element={<Student />} />
                <Route path='/courses/:courseId' element={<Course />} />
                <Route path='/students-search/:searchTerm' element={<StudentSearch />} />
                <Route path='/courses-search/:searchTerm' element={<CourseSearch />} />
              </Route>
              <Route element={<StudentRoute />}>
                <Route path='/me/courses' element={<MyCourses />} />
              </Route>
              <Route element={<UserRoute />}>
                <Route path='/me' element={<Me />} />
                <Route path='/me/change-password' element={<ChangePassword />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Suspense>
        </LoginContextProvider>
      </MediaContextProvider>
    </BrowserRouter>
  );
}

export default App;
