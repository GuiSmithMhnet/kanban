import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const encryptPassword = async (password) => {
    const senhaHash = await bcrypt.hash(password, SALT_ROUNDS);
    return senhaHash;
};

export default encryptPassword;