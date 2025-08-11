const bcrypt = require("bcrypt");

async function createHashedPassword(password){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function verifyHashedPassword(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = { verifyHashedPassword, createHashedPassword }