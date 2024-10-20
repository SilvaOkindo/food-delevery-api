import jwt from "jsonwebtoken";

// token verification
export const verifyToken = (req, res, next) => {
  //console.log("headers", req.headers)
  let token;
  const headers = req.headers.authorization || req.headers.Authorization

  console.log(headers);

  if (headers && headers.startsWith("Bearer")) {
    token = headers.split(" ")[1];
  }

  if (!token) {
    res.status(400).json({ message: "No token authorization needed" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log("decoded user: ", req.user);
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token!" });
  }
};

// role authorization

export const verifyAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.userType === "Vendor" ||
      req.user.userType === "Admin" ||
      req.user.userType === "Driver" ||
      req.user.userType === "Client"
    ) {
      next();
    } else {
      res.status(403).json({ message: "You are not authorized!" });
    }
  });
};


export const verifyVendor = (req, res, next) => {
    verifyToken(req, res, () => {
      if (
        req.user.userType === "Vendor" ||
        req.user.userType === "Admin"
      ) {
        next();
      } else {
        res.status(403).json({ message: "You are not authorized!" });
      }
    });
  };
  

  
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (
        req.user.userType === "Admin"
      ) {
        next();
      } else {
        res.status(403).json({ message: "You are not authorized!" });
      }
    });
  };

  
export const verifyDriver = (req, res, next) => {
    verifyToken(req, res, () => {
      if (
        req.user.userType === "Driver" ||
        req.user.userType === "Admin"
      ) {
        next();
      } else {
        res.status(403).json({ message: "You are not authorized!" });
      }
    });
  };
  
  
