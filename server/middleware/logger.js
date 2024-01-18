const moment = require('moment');

const logTimeMiddleware = () => {
    const currentDate = new Date();
    return moment(currentDate).format('YYYY-MM-DD HH:mm');
};

module.exports = logTimeMiddleware;