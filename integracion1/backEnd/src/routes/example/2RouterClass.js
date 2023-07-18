const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { logger } = require('../../config/logger')
// const router = Router()

class RouterClass {
  constructor () {
    this.router = Router()
    this.init()
  }

  init () {}

  getRouter () {
    return this.router
  }

  applyCallBacks (callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params)
      } catch (error) {
        logger.error(error)
        params[1].status(500).send(error)
      }
    })
  }

  generateCustomResponse = (req, res, next) => {
    res.sendSuccess = (payload) => res.send({ status: 'success', payload })
    res.sendServerError = (error) => res.send({ status: 'error', error })
    res.sendUserError = (error) => res.send({ status: 'error', error })
    next()
  }

  hadnlePolicies = (policies) => (req, res, next) => {
    if (policies[0] === 'PUBLIC') return next()
    const authHeader = req.headers.authorization
    if (!authHeader) return res.send({ status: 'error', error: 'No tienes autorización' })
    const token = authHeader.split(' ')[1]
    const user = jwt.verify(token, 'claveDev')
    if (!policies.includes(user.role.toUpperCase())) return res.status(403).send({ status: 'error', error: 'No permiso' })
    req.user = user
    next()
  }

  get (path, policies, ...callbacks) {
    this.router.get(path, this.hadnlePolicies(policies), this.generateCustomResponse, this.applyCallBacks(callbacks))
  }

  post (path, policies, ...callbacks) {
    this.router.get(path, this.hadnlePolicies(policies), this.generateCustomResponse, this.applyCallBacks(callbacks))
  }

  put (path, policies, ...callbacks) {
    this.router.get(path, this.hadnlePolicies(policies), this.generateCustomResponse, this.applyCallBacks(callbacks))
  }

  delete (path, policies, ...callbacks) {
    this.router.get(path, this.hadnlePolicies(policies), this.generateCustomResponse, this.applyCallBacks(callbacks))
  }

  // post () {}
  // put () {}
  // delete () {}
}

module.exports = RouterClass
