/**
 * Created by Webstorm.
 * @author taoqili
 * @date 2017/4/26
 */
import fs from 'fs'
import path from 'path'

export default dir => {
  const patcher = {}
  const files = fs.readdirSync(dir)
  const load = (path, name) => {
    return require(path + (name || ''))
  }
  files.forEach(function (filename) {
    if (!/\.js$/.test(filename)) {
      return
    }
    const name = path.basename(filename, '.js')
    const _load = load.bind(null, dir, name)
    patcher.__defineGetter__(name, _load)
  })
  return patcher
}

