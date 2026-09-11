const bcrypt = require("bcrypt");

const hashPassword = async(password) => {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    // console.log(password,hashedPassword)
    return hashedPassword;
    
};

const comparedPassword = async(password, hashedPassword) => {
    const checkPassword = await bcrypt.compare(password, hashedPassword);
    // console.log(checkPassword)
    return checkPassword;
};

module.exports = {hashPassword, comparedPassword};
