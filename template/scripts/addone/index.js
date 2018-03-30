/**
 * Created by Webstorm.
 * @author taoqili
 * @date 2017/6/5
 */
import storeWatcher from './store-watch'
import apiWatcher from './api-watch'
import routeWatcher from './route-watch'
import mockServer from './mock-server'

storeWatcher.start()
apiWatcher.start()
routeWatcher.start()
mockServer()