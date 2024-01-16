const authorize = (requiredRole) => {
    return (req, res, next) => {
      
      const user = req.user;
     
      if (user.role === requiredRole) {
       
        next();
      } else {
        
        res.status(403).json({ error: 'Forbidden' });
       
  
      }
      
    };
  };
  
  module.exports = authorize;
  