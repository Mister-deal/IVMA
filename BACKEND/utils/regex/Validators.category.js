const validateCategoryName = (name) => {
    return name && typeof name === 'string'
        && name.length >= 2
        && name.length <= 50;
};

module.exports = {
    validateCategoryName
};
