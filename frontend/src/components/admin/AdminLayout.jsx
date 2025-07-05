import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaBullhorn, FaBook, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Fixed: Proper active path checking
  const isActive = (path) => {
    const match = location.pathname.match(/\/admin\/([^/]+)/);
    return match && match[1] === path;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/announcements"  // Fixed: Absolute path
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive('announcements') ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                <FaBullhorn className="flex-shrink-0" />
                <span>Announcements</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/quizzes"  // Fixed: Absolute path
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive('quizzes') ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                <FaBook className="flex-shrink-0" />
                <span>Quizzes</span>
              </Link>
            </li>
          </ul>
        </nav>

        <button
          onClick={() => {
            dispatch(logout());
            navigate('/login');
          }}
          className="mt-auto flex items-center gap-3 p-3 text-blue-200 hover:text-white transition-colors"
        >
          <FaSignOutAlt className="flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}