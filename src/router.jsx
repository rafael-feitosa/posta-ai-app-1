import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import MyAccount from './pages/MyAccount/MyAccount';
import NotFound from './pages/NotFound/NotFound';
import Tasks from './pages/Tasks/Tasks';
import AddTask from './pages/AddTask/AddTask';
import Settings from './pages/Settings/Settings';
import EditAccount from './pages/EditAccount/EditAccount';
import Archive from './pages/Archive/Archive';
import TaskDetails from './pages/TaskDetails/TaskDetails';
import Kanban from './pages/Kanban/Kanban';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/tasks/add-task" element={<AddTask />} />
        <Route path="/tasks/details/:id" element={<TaskDetails />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="my-account" element={<MyAccount />} />
        <Route path="/tasks/archived" element={<Archive />} />
        <Route path="/my-account/edit-account" element={<EditAccount />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
