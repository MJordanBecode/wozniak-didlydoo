import DOMPurify from 'dompurify';

/**
 * Sanitize une entrée utilisateur pour éviter les attaques XSS.
 * status : working
 * @param {string} element - La donnée à nettoyer.
 * @param {boolean} strict - Si `true`, supprime toutes les balises HTML.
 * @returns {string} - La version sécurisée de l'entrée.
 * @description : exemple => sanitize(userInput, true)
 */
export default function sanitize(element, strict = false) {
    if (!element || typeof element !== "string") {
        return ""; // Retourne une string vide si l'entrée est invalide
    }

    return strict 
        ? DOMPurify.sanitize(element, { ALLOWED_TAGS: [] }) // Supprime toutes les balises
        : DOMPurify.sanitize(element); // Garde les balises sûres
}