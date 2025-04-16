import { api } from "../../../api/api";

/**
 * List
 */
export const getTeams = async () => {
    try {
        const token = localStorage.getItem("token_portuarios");
        if (!token) {
            console.warn("No hay token disponible en localStorage");
            return [];
        }

        const response = await api("teams/list", "GET", null, token);

        // Verificar si la API devuelve datos válidos
        if (!response || typeof response !== "object") {
            console.error("Respuesta no válida de la API:", response);
            return [];
        }

        return response;
    } catch (error) {
        console.error("Error al obtener los equipos:", error);
        return [];
    }
};

/**
 * Show
 */
export const getTeamById = async (id) => {
    try {
        const token = localStorage.getItem("token_portuarios");
        if (!token) return null;

        const response = await api(`teams/show/${id}`, "GET", null, token);
        return response;
    } catch (error) {
        console.error("Error al obtener el registro:", error);
        return null;
    }
};


/**
 * Store
 */
export const createTeam = async (data) => {
    try {
        const token = localStorage.getItem("token_portuarios");
        if (!token) {
            console.warn("No hay token disponible en localStorage");
            return null;
        }

        const response = await api("teams/store", "POST", data, token);

        if (!response || typeof response !== "object") {
            console.error("Error en la respuesta de la API:", response);
            return null;
        }

        return response;
    } catch (error) {
        console.error("Error al enviar los datos:", error);
        return null;
    }
};



/**
 * Update
 */
export const updateTeam = async (id, data) => {
    try {
        const token = localStorage.getItem("token_portuarios");
        if (!token) return null;

        const response = await api(`teams/update/${id}`, "PUT", data, token);
        return response;
    } catch (error) {
        console.error("Error al actualizar el registro:", error);
        return null;
    }
};


/**
 * Delete
 */
export const deleteTeam = async (id) => {
    try {
        const token = localStorage.getItem("token_portuarios");
        if (!token) return null;

        const response = await api(`teams/delete/${id}`, "DELETE", null, token);
        return response;
    } catch (error) {
        console.error("Error al actualizar el registro:", error);
        return null;
    }
};

