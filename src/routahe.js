import {parseArguments} from './argumentParser'
import programs from './programs'

const main = async () => {
	const args = process.argv.slice(2)
	const opts = parseArguments(args)
	const program = programs.get(opts)
	try {
	  await program()
	} catch (e) {
	  console.log('Error::', e)
	}
}

main()