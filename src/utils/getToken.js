"use client";

const getToken = () => {
    return localStorage.getItem('kanban-token');
};

export default getToken;
