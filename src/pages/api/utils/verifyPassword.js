import bcrypt from 'bcrypt';

const verifyPassword = async (password, encryptPassword) => {
    const test = await bcrypt.compare(password, encryptPassword);

    return test;
};

export default verifyPassword;