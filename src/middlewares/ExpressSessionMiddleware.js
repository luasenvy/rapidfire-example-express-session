const expressSession = require('express-session')

const {
  Interfaces: { Middleware },
} = require('@luasenvy/rapidfire')

class ExpressSessionMiddleware extends Middleware {
  constructor() {
    super()

    this.expressSession = expressSession({
      secret: 'keyboardcat',
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  }

  async init() {
    this.pipelines.push({ pipe: (...args) => this.pipe(...args) })
  }

  pipe(req, res, next) {
    this.expressSession(req, res, () => {
      console.info('[Express Session] req.session >>>', JSON.stringify(req.session))
      next()
    })
  }
}

module.exports = ExpressSessionMiddleware
