const getCurrentUrl = () => {

    if(process.env.STAGE == 'production'){
        return {
            fullUrl: `http://localhost:${process.env.PRODUCTION_PORT}`,
            origin: `http://localhost`,
        }
    }

    if(process.env.STAGE == 'development'){
        return {
            fullUrl: `http://localhost:${process.env.DEVELOPMENT_PORT}`,
            origin: `http://localhost`,
        };
    }
}

export default getCurrentUrl;