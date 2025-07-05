import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';

import UserPage from './pages/UserPage';
import AdminLayout from './components/admin/AdminLayout';
import AnnouncementsList from './components/admin/announcements/AnnouncementsList';
import QuizList from './components/admin/quizzes/QuizList';

export default function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>

      {/* Admin Routes */}
  <Route path="/admin/*" element={<AdminLayout />}>
    <Route index element={<Navigate to="announcements" replace />} />
    <Route path="announcements" element={<AnnouncementsList />} />
    <Route path="quizzes" element={<QuizList />} />
    <Route path="*" element={<Navigate to="announcements" replace />} />
  </Route>
  
  {/* Other routes (login, user, etc.) */}



      {/* Public route */}
      <Route path="/login" element={
        !user ? <LoginPage /> : <Navigate to={user.role === 'admin' ? '/admin' : '/'} />
      } />

      {/* Protected admin routes */}
      <Route path="/admin/*" element={
        user?.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />
      } />

      {/* Protected user route */}
      <Route path="/" element={
        user ? <UserPage /> : <Navigate to="/login" />
      } />

      {/*all other redirect */}
      <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
    </Routes>
  );
}