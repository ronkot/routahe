import Moment from 'moment'
import {assignIn, includes} from 'lodash'

const parseArguments = (args) => {
  const options = args.reduce((opts, arg) => {
    if (arg && isUnknownCommand(arg)) {
      opts.help = true
      opts.unknownCommand = arg
    } else if (arg && isHelpCommand(arg)) {
      opts.help = true
    } else if (arg && isTopCommand(arg)) {
      opts.top = true
    } else if (arg && isLatestCommand(arg)) {
      opts.latest = true
    } else if (arg && isHistoryCommand(arg))  {
      opts.history = true
    } else if (arg &&isTime(arg)) {
      opts.arriveBy = arg.startsWith('@')
      opts.time = arg.replace('@', '')
    } else if (arg && isDate(arg)) {
      opts.date = arg
    } else if (arg && !opts.address1) {
      opts.address1 = arg
    } else if (arg && opts.address1 && !opts.address2) {
      opts.address2 = arg
    }
    return opts
  }, {})

  if (options.time) {
    options.dateTime = parseDateTime(options)
  }

  return mapAddresses(options)
}

const mapAddresses = (options) => {
  const opts = assignIn({}, options)
  const {address1, address2} = opts
  if (address1 && address2) {
    opts.addressFrom = address1
    opts.addressTo = address2
  } else if (address1) {
    opts.addressTo = address1
  }
  delete opts.address1
  delete opts.address2
  return opts
}


const parseDateTime = (opts) => {
  const date = opts.date ? Moment(opts.date, ['DD.MM.YYYY', 'DD.MM.', 'DD.MM', 'DD.M.YYYY', 'DD.M.', 'DD.M', 'D.M', 'D.MM', 'D.MM.', 'D.M.YYYY', 'D.MM.YYYY'], true) : new Moment()
  const time = Moment(opts.time, ['HH:mm', 'H:mm'], true)
  if (!time.isValid()) {
    return null
  }
  time.set({date: date.date(), month: date.month(), year: date.year()})
  return time
}

const isTime = (arg) => {
  return !!arg.match(/^@?\d{1,2}:\d{2}$/g)
}

const isDate = (arg) => {
  return !!arg.match(/^\d{1,2}\.\d{1,2}\.?(\d{4})?$/g)
}

const isHelpCommand = (arg) => {
  return arg === '--help'
}

const isTopCommand = (arg) => {
  return arg === '--top'
}

const isLatestCommand = (arg) => {
  return arg === '--latest'
}

const isHistoryCommand = (arg) => {
  return arg === '--history'
}

const isUnknownCommand = (arg) => {
  return arg.startsWith('--') && !includes(['--top', '--latest', '--help', '--history'], arg)
}

export {
  parseArguments,
  mapAddresses,
  parseDateTime,
  isTime,
  isDate,
  isHelpCommand,
  isTopCommand,
  isLatestCommand,
  isHistoryCommand,
  isUnknownCommand
}
