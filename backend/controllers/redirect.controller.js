import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    // Aquí va la lógica para obtener un link por su nanoLink
    const link = await Link.findOne({ nanoLink });

    // Verificar si existe el link
    if (!link) {
      return res.status(404).json({ error: "No existe el link" });
    }

    return res.redirect(link.longLink);
  } catch (error) {
    console.log(error);
    // Verificar si el error es por un formato incorrecto de id
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato de id incorrecto" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};
