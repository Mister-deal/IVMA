const logoutController = async (req, res) => {
    res.clearCookie('access_token')
    return res.json({ Status: 'Success' })
}

module.exports = logoutController
