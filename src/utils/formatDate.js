import dayjs from 'dayjs';

const dateFormat = 'DD/MM/YYYY';
const dateTimeFormat = 'DD/MM/YYYY HH:mm:ss';

const formatDate = (dateString) => {
    if (!dateString) return '';

    return dayjs(dateString).format(dateFormat);
};

const formatDateTime = (dateString) => {
    if (!dateString) return '';

    return dayjs(dateString).format(dateTimeFormat);
};

export { formatDate, formatDateTime };