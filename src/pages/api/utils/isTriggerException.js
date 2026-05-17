// Código de erro usado nas triggers do banco para identificar erros específicos
const isTriggerException = (errorCode) => {
    return errorCode === 'P4001';
}

export default isTriggerException;