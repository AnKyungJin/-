const STORAGE_KEY = 'gemini-api-key-nano-banana';

/**
 * "Encrypts" (Base64 encodes) and saves the API key to localStorage.
 * @param apiKey The API key string to save.
 */
export const saveApiKey = (apiKey: string): void => {
    if (!apiKey) return;
    try {
        const encodedKey = btoa(apiKey);
        localStorage.setItem(STORAGE_KEY, encodedKey);
    } catch (e) {
        console.error("Failed to save API key:", e);
    }
};

/**
 * Retrieves and "decrypts" (Base64 decodes) the API key from localStorage.
 * @returns The API key string or null if not found or invalid.
 */
export const getApiKey = (): string | null => {
    try {
        const encodedKey = localStorage.getItem(STORAGE_KEY);
        if (!encodedKey) {
            return null;
        }
        return atob(encodedKey);
    } catch (e) {
        console.error("Failed to retrieve or decode API key:", e);
        // Clear corrupted key
        clearApiKey();
        return null;
    }
};

/**
 * Removes the API key from localStorage.
 */
export const clearApiKey = (): void => {
    localStorage.removeItem(STORAGE_KEY);
};
