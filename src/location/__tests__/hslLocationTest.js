import {getLocationByQuery} from '../hslLocation'

describe('HSL Location', function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000
  it('should fetch location by given criteria', async() => {
    const locations = await getLocationByQuery('Helsingin päärautatieasema')
    expect(locations).toMatchSnapshot()
  })

  it('should return empty object if criteria is empty', async() => {
    const locations = await getLocationByQuery('')
    expect(locations).toEqual(null)
  })
})