import './App.css';
import Default from './layout/Default';
import TaskList from './pages/task/TaskList';
import MemberList from './pages/member/MemberList';
import MemberAdd from './pages/member/MemberAdd';
import MemberEdit from './pages/member/MemberEdit';
import MemberDetail from './pages/member/MemberDetail';
import TaskAdd from './pages/task/TaskAdd';
import TaskDetail from './pages/task/TaskDetail';
import TaskEdit from './pages/task/TaskEdit';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
              // Dashboard
                <Route path='/' element={ <PrivateRoutes> <Default /> </PrivateRoutes>}/>
                // Task

                <Route path='/tasks' element={ <PrivateRoutes> <TaskList /> </PrivateRoutes>}/>
                <Route path='/task/create' element={ <PrivateRoutes> <TaskAdd /> </PrivateRoutes>}/>
                <Route path='/task/:id' element={ <PrivateRoutes> <TaskDetail /> </PrivateRoutes>}/>
                <Route path='/task/edit/:id' element={ <PrivateRoutes> <TaskEdit /> </PrivateRoutes>}/>

                // member

                <Route path='/members' element={ <PrivateRoutes> <MemberList /> </PrivateRoutes>}/>
                <Route path='/member/create' element={ <PrivateRoutes> <MemberAdd /> </PrivateRoutes>}/>
                <Route path='/member/:id' element={ <PrivateRoutes> <MemberDetail /> </PrivateRoutes>}/>
                <Route path='/member/edit/:id' element={ <PrivateRoutes> <MemberEdit /> </PrivateRoutes>}/>

                // login
                <Route path='/login'  element={ <PublicRoutes> <Login /> </PublicRoutes>}/>

                // Registration
                <Route path='/registration' element={ <PublicRoutes> <Registration /> </PublicRoutes>}/>

            </Routes>
        </BrowserRouter>
        
    </>
  );
}

export default App;
