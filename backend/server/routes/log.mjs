import { Router } from "express";
import { getDBLog } from "../helpers/functions.mjs";
import * as mw from "../helpers/middlewares.mjs";

const router = Router();

router.route("/logs/:eventId?/:logIndex?")
  // 🔹 Récupérer tous les logs ou un log spécifique
  .get(async (req, res) => {
    console.log("GET /api/log called");
    const db = await getDBLog();
    const { eventId } = req.params;

    if (!db.data || !db.data.logs) {
      return res.status(404).json({ message: "Base de données vide ou mal formée." });
    }

    if (!eventId) {
      // Retourner tous les logs si aucun ID précisé
      return res.json(db.data.logs);
    }

    const logs = db.data.logs[eventId];

    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: "Aucun log trouvé pour cet eventId." });
    }

    console.log("Logs récupérés pour", eventId, ":", logs);
    return res.json(logs);
  })

  // 🔹 Ajouter un nouveau log
  .post(mw.noBody, async (req, res, next) => {
    try {
      const db = await getDBLog();
      const { eventId, name, author, description } = req.body;
  
      if (!eventId) {
        return res.status(400).json({ error: "eventId is required" });
      }
  
      // Si logs[eventId] n'existe pas, on l'initialise comme un tableau vide
      if (!db.data.logs) db.data.logs = {};
      if (!db.data.logs[eventId]) db.data.logs[eventId] = [];
  
      // Ajouter le log à l'eventId correspondant
      db.data.logs[eventId].push({
        name,
        author,
        description,
        timestamp: new Date().toISOString()
      });
  
      // Sauvegarder les modifications dans le fichier JSON
      await db.write();
  
      return res.json({ message: "Log ajouté avec succès", logs: db.data.logs[eventId] });
    } catch (error) {
      console.error("Erreur dans POST /api/logs :", error);
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }
})


  // 🔹 Supprimer un log spécifique
  .delete(async (req, res) => {
    const db = await getDBLog();
    const { eventId, logIndex } = req.params;
  
    if (!db.data?.logs?.[eventId]) {
      return res.status(404).json({ message: "Aucun log trouvé pour cet eventId." });
    }
  
    const logs = db.data.logs[eventId];
  
    if (logIndex === undefined || isNaN(logIndex) || logIndex < 0 || logIndex >= logs.length) {
      return res.status(400).json({ message: "Index de log invalide." });
    }
  
    // Supprimer le log à l’index donné
    logs.splice(logIndex, 1);
  
    // Si plus aucun log, tu peux supprimer complètement la clé eventId si tu veux
    if (logs.length === 0) {
      delete db.data.logs[eventId];
    }
  
    await db.write();
    return res.json({ message: "Log supprimé avec succès." });
  });

export default router;
