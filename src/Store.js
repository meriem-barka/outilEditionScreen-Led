import { writable } from "svelte/store";

export const catalogStore = writable([]); // Contient les articles (cabinet, sending cards, etc.)
export const screenConfigStore = writable([]); // Contient les configurations d’écrans
export const cableConfigStore = writable([]); // Contient les informations de câblage
