import type IStorage from './IStorage';

export default class SessionStorage implements IStorage {
    clearStorage(): void {
        window.sessionStorage.clear();
    }

    getItem(key: string): string | null {
        return window.sessionStorage.getItem(key);
    }

    storeItem(key: string, value: string): void {
        return window.sessionStorage.setItem(key, value);
    }
}
