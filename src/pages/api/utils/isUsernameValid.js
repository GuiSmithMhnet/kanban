const USERNAME_REGEX = /^[A-Za-z0-9_]+$/;

const isUsernameValid = (username) => USERNAME_REGEX.test(username);

export default isUsernameValid;
