import { Routes, Route } from 'react-router-dom';
import AppRouter from './router';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <AppRouter>
      <Routes>
        <Route path="/login" element={<h1>Login</h1>} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AppRouter>
  );
}

export default App;
