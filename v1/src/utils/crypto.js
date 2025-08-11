const crypto = require('crypto');

// Encryption function
const encrypt = (number, key) => {
    const text = number.toString();
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decryption function
const decrypt = (ciphertext, key) => {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return parseInt(decrypted);
}

// Function to encrypt text
const encryptText = (text, key) => {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Function to decrypt text
const decryptText = (encryptedText, key) => {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt, encryptText, decryptText };
