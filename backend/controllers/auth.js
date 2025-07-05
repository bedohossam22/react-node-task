// Hardcoded users - no database needed
const hardcodedUsers = [
  {
    username: 'admin',
    password: 'admin123', // Plain text for demo only
    role: 'admin'
  },
  {
    username: 'user',
    password: 'user123', // Plain text for demo only
    role: 'user'
  }
];

export const login = (req, res) => {
  const { username, password } = req.body;
  
  // Find user in hardcoded array
  const user = hardcodedUsers.find(u => 
    u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ 
      success: false,
      message: 'Invalid username or password' 
    });
  }

  // Successful login response
  res.json({
    success: true,
    username: user.username,
    role: user.role,
    redirectTo: user.role === 'admin' ? '/admin' : '/dashboard'
  });
};