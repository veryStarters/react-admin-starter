/**
 * Created by Webstorm.
 * @author taoqili
 * @date 2017/6/5
 */
import fs from 'fs'
import path from 'path'
import * as util from './util'

function AsyncRoutePlugin() {
}

AsyncRoutePlugin.prototype.apply = function (compiler) {
  let pagesDir = path.join(__dirname, '../../src/pages/')
  let routeDir = path.join(__dirname, '../../src/common/core/router/')
  let routePath = path.join(routeDir, 'routes.js')
  let customRoutePath = path.join(routeDir, 'routes-custom.js')
  compiler.plugin("compile", function () {
    util.clearFileContent(routePath,
      [
        '本文件由系统自动生成，请勿更改',
        '变量名代表route的name，变量名请按照驼峰格式书写，每个驼峰单词将被切分成route的path  userLogin => /user/login'
      ],
      'import React from \'react\'\n' +
      'import Loadable from \'react-loadable\'\n' +
      'const Loading = () => <div>Loading...</div>\n'
    )
    walk(pagesDir, routePath, customRoutePath)
    console.log('\nAll routes create done!')
  })

  function walk(dir, routePath, customRoutePath) {
    let fileList = fs.readdirSync(dir)
    fileList.forEach(file => {
      let filePath = path.join(dir, file)
      if (fs.statSync(filePath).isFile()) {
        if (/index\.js/.test(filePath)) {
          let path = util.formatPath(filePath, [
            /.*\/src\/pages/i,
            'index.js'
          ])
          let name = util.path2name(path, 'home')
          fs.appendFile(
            routePath,
            `export const ${name} = Loadable({ loader: () => import('pages${path}'), loading: Loading })\n`,
            function (err) {
              if (err) throw err
            }
          )
        }
        if (/route\.js/.test(filePath)) {
          util.clearFileContent(customRoutePath, [
            '本文件由系统依据pages中的route.js文件生成，请勿更改'
          ])
          let path = util.formatPath(filePath, [
            /.*\/src\/pages/i,
            'route.js'
          ])
          let name = util.path2name(path, 'home')
          fs.appendFile(
            customRoutePath,
            `export const ${name} = require(\'src/pages${path}route.js\')\n`,
            function (err) {
              if (err) throw err
            }
          )
        }
      } else if (fs.statSync(filePath).isDirectory()) {
        walk(filePath, routePath, customRoutePath)
      }
    })
  }
}
export default AsyncRoutePlugin
