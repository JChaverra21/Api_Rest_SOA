import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Alternativa buscando por email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    // Generar el token JWT
    return res.status(201).json({ ok: "Usuario registrado" });
  } catch (error) {
    console.log(error);
    // Alternativa por defecto mongoose
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si existe el usuario
    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe este usuario" });

    // Verificar contraseña
    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "Contraseña incorrecta" });

    // Generar el token JWT
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

// Aquí se puede realizar el CRUD de los usuarios y es una ruta protegida
export const infoUser = async (req, res) => {
  try {
    // Buscar el usuario por el id, lean para que no sea un objeto de mongoose y mas liviano
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user._id });
  } catch (error) {
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("No existe el token");

    // Si existe el token, se hace la firma
    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

    // Generar el token JWT
    const { token, expiresIn } = generateToken(uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
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

// Cerrar sesión
export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  return res.json({ ok: "Sesión cerrada" });
};