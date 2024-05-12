import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    console.log(token);
    if (!token) throw new Error("No existe el token en el header usa Bearer");

    // Separar el token
    token = token.split(" ")[1];

    // Devuelve la información del token
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  } catch (error) {
    console.log(error.message);

    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};
