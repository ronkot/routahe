import moment from 'moment'
import RouteQuery from '../RouteQuery'

describe('HSL-API', function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000

  const nextWednesday = moment().day(10).hour(15).minute(13)

  it('should be able to get route', async() => {
    const routes = await new RouteQuery().fetch({
      from: { label: 'Kottaraistie 1a, Helsinki', lon: 25.005448, lat: 60.263282 },
      to:  { label: 'Kottaraistie 4a, Helsinki', lon: 25.004373, lat: 60.263418 },
      date: nextWednesday,
      arriveBy: false
    })

    const filteredRoutes = routes.map(route => removeRouteTimeAttributes(route))

    expect(filteredRoutes[0]).toMatchSnapshot()  // First route is walk-only
  })

  it('should be able to get route with arriveBy', async() => {
    const routes = await new RouteQuery().fetch({
      from: { label: 'Kottaraistie 1a, Helsinki', lon: 25.005448, lat: 60.263282 },
      to:  { label: 'Kottaraistie 4a, Helsinki', lon: 25.004373, lat: 60.263418 },
      date: nextWednesday,
      arriveBy: true
    })

    const filteredRoutes = routes.map(route => removeRouteTimeAttributes(route))
    expect(filteredRoutes[0]).toMatchSnapshot()
  })

  function removeRouteTimeAttributes(route) {
    route.legs = route.legs.map(leg => removeLegTimeAttributes(leg))
    return route
  }

  function removeLegTimeAttributes(leg) {
    const {duration, distance, mode, from, to, route} = leg
    return {duration, distance, mode, from, to, route}
  }
})