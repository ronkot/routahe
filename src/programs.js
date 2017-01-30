import {gray} from 'chalk'
import history from './history'
import {action} from './route'

const help = (opts) => {
  if (opts.unknownCommand) {
    console.log(`  Unknown command: ${opts.unknownCommand}`)
    console.log('')
  }
  console.log('  Examples:')
  console.log('')
  console.log(gray('    Default from - to usage'))
  console.log('    $ routahe kamppi pasila')
  console.log('')
  console.log(gray('    Search for your current location using nearby wifi access points.'))
  console.log('    $ routahe pasila')
  console.log('')
  console.log(gray('    Specify departure time'))
  console.log('    $ routahe kamppi pasila 5:30')
  console.log('')
  console.log(gray('    Specify arrival time with @'))
  console.log('    $ routahe kamppi pasila @12:30')
  console.log('')
  console.log(gray('    Specify date with time'))
  console.log('    $ routahe kamppi pasila 12:30 24.12.2016')
  console.log('')
  console.log(gray('    Specify locations using latest route'))
  console.log('    $ routahe --latest @12:30')
  console.log('')
  console.log(gray('    Specify locations using the most popular route'))
  console.log('    $ routahe --top @12:30')
  console.log('')
}

const historyAddresses = async () => {
  const routes = await history.get()
  const addresses = routes.reduce((addresses, route) => addresses.concat(route.from, route.to), [])
  console.log(addresses.join('\n')) 
}

const get = (opts) => {
  return opts.help
    ? help.bind(null, opts)
    : opts.history
      ? historyAddresses
      : action.bind(null, opts)
}

module.exports = {
  get,
  help,  // export for testing
  historyAddresses  // export for testing
}