const getToken = (token) => {
    try {
        localStorage.setItem('kanban-token', token);

        return true;
    } catch (error) {
        console.log('Erro ao armazenar token');
        
        return false;
    }
};

export default getToken;
