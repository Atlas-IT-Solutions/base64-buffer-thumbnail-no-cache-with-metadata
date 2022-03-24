module.exports.removeUndefined = (dimensions) => {
    Object.keys(dimensions).forEach(key => dimensions[key] === undefined && delete dimensions[key]);
    return dimensions
}