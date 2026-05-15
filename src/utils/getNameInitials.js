const getNameInitials = (fullName) => {
    if (typeof fullName !== 'string'){
        return fullName;
    }

    fullName.split(' ').slice(0,2).map(name => name.charAt(0).toLocaleUpperCase).join()
};

export default getNameInitials;