import storeWatcher from './store-watch'
import apiWatcher from './api-watch'
import routeWatcher from './route-watch'
import mockServer from './mock-server'

storeWatcher.start()
apiWatcher.start()
routeWatcher.start()
mockServer()