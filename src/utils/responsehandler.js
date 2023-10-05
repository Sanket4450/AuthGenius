function sendSuccess (res, status, data = [], message) {
    return res.status(status).json({
        success: true,
        message: message || 'OK',
        results: data
    })
}

module.exports = sendSuccess