import { validationResult, body, param } from "express-validator";
import axios from "axios";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

// Validar los params
export const paramLinkValidator = [
  param("id", "Formato de id incorrecto").trim().notEmpty().escape(),
  validationResultExpress,
];

// Validar los links
export const bodyLinkValidator = [
  body("longLink", "Formato de link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        // Verificar si es una URL válida
        if (!value.startsWith("https://")) {
          value = "https://" + value;
        }

        await axios.get(value);
        return value;
      } catch (error) {
        //console.log(error);
        throw new Error("Not found longlink 404");
      }
    }),
  validationResultExpress,
];

export const bodyRegisterValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "La contraseña debe tener al menos 6 caracteres")
    .trim()
    .isLength({ min: 6 }),
  body("password", "Formato de contraseña incorrecto").custom(
    (value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Las contraseñas no coinciden");
      } else {
        return value;
      }
    }
  ),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "La contraseña debe tener al menos 6 caracteres")
    .trim()
    .isLength({ min: 6 }),
  validationResultExpress,
];
