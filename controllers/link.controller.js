import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
  try {
    // Aquí va la lógica para obtener todos los links
    const links = await Link.find({ uid: req.uid });
    return res.json({ links });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

// Obtener un link por su nanoLink
export const getLink = async (req, res) => {
  try {
    const { id } = req.params;
    // Aquí va la lógica para obtener un link por su nanoLink
    const link = await Link.findById(id);

    // Verificar si existe el link
    if (!link) {
      return res.status(404).json({ error: "No existe el link" });
    }

    // Verificar si el link pertenece al usuario
    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: "No le pertenece ese id" });
    }

    return res.json({ link });
  } catch (error) {
    console.log(error);
    // Verificar si el error es por un formato incorrecto de id
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato de id incorrecto" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

// Crear un nuevo link
export const createLink = async (req, res) => {
  try {
    let { longLink, nanoLink } = req.body;
    // Verificar si es una URL válida
    if (!longLink.startsWith("https://")) {
      longLink = "https://" + longLink;
    }
    console.log(longLink);

    const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
    const newLink = await link.save();

    return res.status(201).json({ newLink });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

// Eliminar un link
export const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    // Aquí va la lógica para obtener un link por su nanoLink
    const link = await Link.findById(id);

    // Verificar si existe el link
    if (!link) {
      return res.status(404).json({ error: "No existe el link" });
    }

    // Verificar si el link pertenece al usuario
    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: "No le pertenece ese id" });
    }

    // Eliminar el link de la base de datos
    await link.deleteOne({ _id: id });

    return res.json({ link });
  } catch (error) {
    console.log(error);
    // Verificar si el error es por un formato incorrecto de id
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato de id incorrecto" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};
