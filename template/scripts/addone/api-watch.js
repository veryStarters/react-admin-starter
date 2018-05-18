/**
 * Created by Webstorm.
 * @author taoqili
 * @date 2017/4/26
 */
import fs from 'fs'
import path from 'path'
import readLine from 'readline'
import mkdirp from 'mkdirp'
import * as util from './util'
import apiTemplate from './template/api-template'

const Watcher = {
  start() {
    const apiPath = path.join(__dirname, '../../src/api/index.js')

    const watch = file => {
      fs.watchFile(file, {
        persistent: true,
        interval: 2
      }, () => {
        const rd = readLine.createInterface({
          input: fs.createReadStream(file),
          terminal: false
        })
        rd.on('line', (line) => {
          let matches = line.match(/fetch\((?:'|")\/(?:(.*)\/)?(.*?)(?:'|")/)
          if (!matches || !matches[2]) return
          let name = matches[2] + '.js'
          let mockDir = path.join(__dirname, '../../src/api/mock', matches[1] || '')
          let mockFile = path.join(mockDir, name)
          if (util.checkExits(mockDir)) {
            if (!util.checkExits(mockFile)) {
              util.mkFile(mockFile, apiTemplate)
            }
          } else {
            mkdirp(mockDir, (err) => {
              if (!err) {
                util.mkFile(mockFile, apiTemplate)
              }
            })
          }
        })
      })
    }

    watch(apiPath)
  }
}

export default Watcher
