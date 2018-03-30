/**
 * Created by Webstorm.
 * @author taoqili
 * @date 2017/4/24
 */
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import loadModule from './load-module'

const Server = () => {
  const router = express.Router()
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(cookieParser())

  router.all('*', function (req, res, next) {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    res.cookie('TestCookie', 1, { maxAge: 30 * 60 * 1000 })
    const urlInfo = req._parsedUrl
    const pathName = urlInfo.pathname
    const lastIndex = pathName.lastIndexOf('/') + 1
    const dirPath = pathName.substring(0, lastIndex).replace('/api', '')
    const moduleName = pathName.substring(lastIndex).replace('&', '')
    const modules = loadModule(path.join(__dirname, '../../src/api/mock' + dirPath))
    const module = modules[moduleName]
    if (module && module.default && typeof module.default === 'function') {
      res.end(JSON.stringify(module.default(req, res, next)))
    } else {
      res.end('{"ret":"error","code":"-1","msg":"模块' + moduleName + '不存在,","data":""}')
    }
  })

  app.use('/', router)
  app.listen(10082, function () {
  })
}

export default Server
