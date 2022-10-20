const Redirect404 = (req, res) => {
    res.status(404)
    res.json({
        error: 'Not enabled. Get the fuck out !'
    })
}

module.exports = {
    Redirect404
}