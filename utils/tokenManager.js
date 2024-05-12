import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expiresIn = 60 * 15; // 15 minutos

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

// Alternativa para generar el token de refresco
export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30; // 30 días

  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
    //return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const errorsValidateToken = (token) => {
  switch (error) {
    case "invalid signature":
      return "La firma del token no es válida";
    case "jwt expired":
      return "El token ha expirado";
    case "invalid token":
      return "El token no es válido";
    default:
      return error;
  }
};
