const path = require('path')

const {
  Interfaces: { Service, ServiceLoader },
} = require('@luasenvy/rapidfire')

class HtmlService extends Service {
  static loader = ServiceLoader

  /**
   * [constructor description]
   * @return {[type]} options.router     [description]
   */
  constructor({ router }) {
    super()

    router.get('*', async (req, res, next) => await this.serveHtml(req, res, next).catch(next))

    this.router = router
  }

  async serveHtml(req, res, next) {
    const filename = /^\/?$/.test(req.url) ? '/index.html' : req.url
    res.sendFile(filename, { root: this.docroot }, err => {
      if (err && err.code === 'ENOENT') {
        err.code = 404
        err.message = `${filename} Not Found`
      }

      next(err)
    })
  }

  get docroot() {
    return path.join(this.$rapidfire.env.paths.root, 'src/public')
  }
}

module.exports = HtmlService
