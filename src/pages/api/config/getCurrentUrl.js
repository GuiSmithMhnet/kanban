const getCurrentUrl = () => {
    if(process.env.STAGE == 'production'){
        return `http://localhost:${process.env.PRODUCTION_PORT}`;
    }

    if(process.env.STAGE == 'development'){
        return `http://localhost:${process.env.DEVELOPMENT_PORT}`;
    }
}

export default getCurrentUrl;