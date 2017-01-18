import RouteQuery from './query/RouteQuery'
import {getLocation} from './location/location'

import {printSearchInfo, printRoutes} from './view/view'
import history from './history'

exports.getAddresses = async (opts) => {
  const {from, to} = opts.top
    ? await history.topRoute()
    : opts.latest
      ? await history.latestRoute()
      : { from: opts.addressFrom, to: opts.addressTo }
  return Promise.all([getLocation(from), getLocation(to)])
}

exports.action = async (opts) => {
  const [fromLocation, toLocation] = await exports.getAddresses(opts)
  history.add(fromLocation.label, toLocation.label)
  await exports.getRoute(fromLocation, toLocation, opts.dateTime, opts.arriveBy)
}

exports.getRoute = async (from, to, date, arriveBy) => {
  exports.validateLocation(from)
  printSearchInfo(from, to, date, arriveBy)
  const routes = await new RouteQuery().fetch({from, to, date, arriveBy})
  printRoutes(routes)
}

exports.validateLocation = (location) => {
  if (!location.label || !location.lon || !location.lat) {
    throw new Error(`Location is missing mandatory information: ${JSON.stringify(location)}`)
  }
  return true
}