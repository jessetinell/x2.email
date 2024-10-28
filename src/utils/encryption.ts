import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_CLIENT_SECRET_KEY || "not-so-secret";

// Encrypt data using the secret key
const encryptData = (data: any) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return encryptedData;
};

// Decrypt data using the secret key
const decryptData = (encryptedData: string) => {
    try {
        const decryptedData = JSON.parse(CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
    }
};

// Store encrypted data in Local Storage
const setItem = (key: string, data: any) => {
    const encryptedData = encryptData(data);
    localStorage.setItem(key, encryptedData);
};

// Get and decrypt data from Local Storage
const getItem = (key: string) => {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
        const decryptedData = decryptData(encryptedData);
        return decryptedData;
    }
    return null;
};

export default { setItem, getItem };
