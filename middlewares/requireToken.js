import jwt from "jsonwebtoken";

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

    const TokenVerificationError = {
      "invalid signature": "La firma del token no es válida",
      "jwt expired": "El token ha expirado",
      "invalid token": "El token no es válido",
      "No Bearer": "Utiliza formato Bearer",
      "jwt malformed": "El token no tiene el formato correcto",
    };

    return res
      .status(401)
      .send({ error: TokenVerificationError[error.message] });
  }
};
