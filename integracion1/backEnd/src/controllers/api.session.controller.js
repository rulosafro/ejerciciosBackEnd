class ApiSessionController {
  getSession = async (req, res) => {
    res.send(req.user)
  }
}

module.exports = new ApiSessionController()
