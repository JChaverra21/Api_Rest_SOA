import { Router } from "express";
import { createLink, getLink, getLinks, removeLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();

// GET /api/v1/links - Get all links
// GET /api/v1/links/:id - Single link
// POST /api/v1/links - Create link
// PATCH/PUT /api/v1/links/:id - Update link
// DELETE /api/v1/links/:id - Delete link

router.get("/", requireToken, getLinks);
router.get("/:id", requireToken, getLink);
router.post("/", requireToken, bodyLinkValidator, createLink);
router.delete("/:id", requireToken, paramLinkValidator , removeLink);

export default router;
