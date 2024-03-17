
// Function to store an object in local storage
export function storeObjectInLocalStorage<T>(key: string, obj: T): void {
    // Convert the object to a JSON string
    const jsonStr = JSON.stringify(obj);
    
    // Store the JSON string in the local storage
    localStorage.setItem(key, jsonStr);
}

// Function to retrieve an object from local storage
export function getObjectFromLocalStorage<T>(key: string): T | null {
    // Retrieve the JSON string from the local storage
    const jsonStr = localStorage.getItem(key);
    
    // Parse the JSON string to convert it back to an object
    if (jsonStr) {
        return JSON.parse(jsonStr) as T;
    } else {
        return null;
    }
}

// Function to remove an object from local storage
export function removeObjectFromLocalStorage(key: string): void {
    // Remove the item with the specified key from local storage
    localStorage.removeItem(key);
}