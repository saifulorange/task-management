import './App.css';
import Default from './layout/Default';
import TaskList from './pages/task/TaskList';
import MemberList from './pages/member/MemberList';
import TaskAdd from './pages/task/TaskAdd';
import TaskDetail from './pages/task/TaskDetail';
import TaskEdit from './pages/task/TaskEdit';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
               
                {/* <PrivateRoutes  path='/' element={ <Default />} /> */}
                <Route path='/' element={ <PrivateRoutes> <Default /> </PrivateRoutes>}/>
                // Task
                {/* <PrivateRoutes  path='/tasks' element={ <TaskList />} /> */}

                <Route path='/tasks' element={ <PrivateRoutes> <TaskList /> </PrivateRoutes>}/>
                {/* <PrivateRoutes  path='/task/create' element={ <TaskAdd />} /> */}
                {/* <Route path='/task/create' element={ <TaskAdd />}/> */}

                <Route path='/task/create' element={ <PrivateRoutes> <TaskAdd /> </PrivateRoutes>}/>
                <Route path='/task/:id' element={ <PrivateRoutes> <TaskDetail /> </PrivateRoutes>}/>
                <Route path='/task/edit/:id' element={ <PrivateRoutes> <TaskEdit /> </PrivateRoutes>}/>

                // Member
                {/* <PrivateRoutes  path='/members' element={ <MemberList />} /> */}
                <Route path='/members' element={ <PrivateRoutes> <MemberList /> </PrivateRoutes>}/>

                // Login
                {/* <PublicRoutes  path="/login" element={ <Login />} /> */}
                <Route path='/login'  element={ <PublicRoutes> <Login /> </PublicRoutes>}/>

                // Registration
                 {/* <PublicRoutes  path="/registration" element={ <Registration />} /> */}
                <Route path='/registration' element={ <PublicRoutes> <Registration /> </PublicRoutes>}/>

            </Routes>
        </BrowserRouter>
        
    </>
  );
}

export default App;
