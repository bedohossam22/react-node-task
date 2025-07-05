// Enhanced to pass user role to controllers
export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.body.role !== requiredRole) {
      return res.status(403).json({ message: `Access denied. Requires ${requiredRole} role` });
    }
    next();
  };
};