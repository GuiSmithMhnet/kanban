const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmailValid = (email) => EMAIL_REGEX.test(email);

export default isEmailValid;
