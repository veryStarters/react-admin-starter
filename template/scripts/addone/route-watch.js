/**
 * Created by Webstorm.
 * @author taoqili
 * @date 2017/4/26
 */
import fs from 'fs'
import Path from 'path'
import shell from 'shelljs'
import chokidar from 'chokidar'
import * as util from './util'
import pageTemplate from './template/page-template'
import routeTemplate from './template/route-template'

const Watcher = {
  start() {
    let blocks = {}
    let routesPath = Path.join(__dirname, '../../src/common/core/router/routes.js')
    let customRoutesPath = Path.join(__dirname, '../../src/common/core/router/routes-custom.js')
    let pagesDir = Path.join(__dirname, '../../src/pages')
    template2routes(routesPath)
    route2customRoutes(customRoutesPath)

    function route2customRoutes(customRoutesPath) {
      util.clearFileContent(customRoutesPath, [
        '本文件由系统依据pages中的route.js文件生成，请勿更改'
      ])
      let watcher = chokidar.watch(pagesDir, {
        ignored: /(^|[\/\\])\../
      })
      watcher.on('add', filePath => {
        if (/route\.js/.test(filePath)) {
          if (blocks[filePath]) {
            delete blocks[filePath]
            return
          }
          let path = util.formatPath(filePath, [
            /.*\/src\/pages/i,
            'route.js'
          ])
          let name = util.path2name(path, 'home')
          fs.appendFile(
            customRoutesPath,
            `export const ${name} = require(\'src/pages${path}route.js\')\n`,
            function (err) {
              if (err) throw err
            }
          )
          if (!util.checkExitsAndEmpty(filePath)) {
            util.mkFile(filePath, routeTemplate.replace(/<%title%>/gi, name))
          }
        }
      })
      watcher.on('unlink', filePath => {
        if (/route\.js/.test(filePath)) {
          let path = util.formatPath(filePath, [
            /.*\/src\/pages/i,
            'route.js'
          ])
          let name = util.path2name(path, 'home')
          let reg = new RegExp(`^export const ${name}.*$`, 'gi')
          shell.sed('-i', reg, '', customRoutesPath)
        }
      })
    }

    /**
     * 通过模板生成路由
     * @param routesPath
     */
    function template2routes(routesPath) {
      util.clearFileContent(routesPath,
        [
          '本文件由系统自动生成，请勿更改',
          '变量名代表route的name，变量名请按照驼峰格式书写，每个驼峰单词将被切分成route的path  userLogin => /user/login'
        ],
        'import React from \'react\'\n' +
        'import Loadable from \'react-loadable\'\n' +
        'const Loading = () => <div>Loading...</div>\n'
        // 'import Async from \'react-code-splitting\'\n'
      )
      const fixTpl = (tpl, name) => {
        return tpl
          .replace(/<%className%>/gi, name.replace(/^\S/, function(s) { return s.toUpperCase() }))
          .replace(/<%humpName%>/gi, name)
      }
      let watcher = chokidar.watch(pagesDir, {
        ignored: /(^|[\/\\])\../
      })
      watcher.on('add', filePath => {
        // page页面
        if (/index\.js$/.test(filePath) && filePath.indexOf('pages/common/components') === -1) {
          if (blocks[filePath]) {
            delete blocks[filePath]
            return
          }
          let path = util.formatPath(filePath, [
            /.*\/src\/pages/i,
            'index.js'
          ])
          let name = util.path2name(path, 'home')
          path = path + 'index.js'
          fs.appendFile(
            routesPath,
            `export const ${name} = Loadable({ loader: () => import('pages${path}'), loading: Loading })\n`,
            function (err) {
              if (err) throw err
            }
          )
          // 填充page模板文件
          if (!util.checkExitsAndEmpty(filePath)) {
            util.mkFile(filePath, fixTpl(pageTemplate, name))
          }
          // 同时增加route配置文件
          let routeFilePath = filePath.replace('index.js', 'route.js')
          if (!util.checkExitsAndEmpty(routeFilePath)) {
            util.mkFile(routeFilePath, '')
          }
        }
      })
      watcher.on('unlink', filePath => {
        if (/index\.js/.test(filePath)) {
          let path = util.formatPath(filePath, [
            /.*\/src\/pages/i,
            'index.js'
          ])
          let name = util.path2name(path, 'home')
          let reg = new RegExp(`^export const ${name}.*$`, 'gi')
          shell.sed('-i', reg, '', routesPath)
        }
      })
    }
  }
}

export default Watcher
