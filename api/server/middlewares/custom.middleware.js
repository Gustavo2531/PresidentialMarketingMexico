exports.logRequest = (req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url} from ${req.ip} at ${new Date()}`)
    next()
}
