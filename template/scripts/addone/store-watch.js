/**
 * Created by Webstorm.
 * @author taoqili
 * @date 2017/4/26
 */
import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'
import shell from 'shelljs'
import storeTpl from './template/store-template'
import * as util from './util'

const modulesPath = path.join(__dirname, '../../src/common/core/store/modules.js')
const modulesDir = path.join(__dirname, '../../src/pages/')
let blocks = []
const Watcher = {
  start() {
    util.clearFileContent(
      modulesPath,
      ['本文件由系统生成，一般情况下无需修改'],
      'export const global = require(\'src/store-global\')\n'
    )
    const watcher = chokidar.watch(modulesDir, {
      ignored: /(^|[\/\\])\../
    })
    watcher.on('add', function (filePath) {
      if (/store\.js$/.test(filePath)) {
        if (blocks[filePath]) {
          delete blocks[filePath]
          return
        }
        let path = util.formatPath(filePath, [
          /.*\/src\/pages/i,
          /store.js/
        ])
        const name = util.path2name(path, 'home')
        path = path + 'store.js'
        fs.appendFile(
          modulesPath,
          `export const ${name} = require('src/pages${path}')\n`,
          function (err) {
            if (err) throw err
          }
        )
        if (!util.checkExitsAndEmpty(filePath)) {
          util.mkFile(filePath, storeTpl)
        }
      }
    })

    watcher.on('unlink', filePath => {
      if (/store\.js$/.test(filePath)) {
        const path = util.formatPath(filePath, [/.*\/src\/pages\//i, /\.js$/])
        const name = util.path2name(path + '/', 'home')
        const reg = new RegExp(`^export const ${name.replace('Store', '')}.*$`, 'gi')
        shell.sed('-i', reg, '', modulesPath)
      }
    })
  }
}

export default Watcher

