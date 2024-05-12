import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    console.log(token);
    if (!token) throw new Error("No existe el token en el header usa Bearer");

    // Separar el token
    token = token.split(" ")[1];

    // Devuelve la información del token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
};
