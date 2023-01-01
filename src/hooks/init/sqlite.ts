import { Hook } from '@oclif/core'
import * as path from 'path'
import * as os from 'os'
import Db from '../../db/init'

const sqlite: Hook<'init'> = async function (opts) {
  try {
    // DB file.
    const dbfile = path.join(os.homedir(), '.packdir', 'pd.sqlite')
    const db = await Db(dbfile)
    console.log('db:31: ', db)
  } catch (err) {
    console.error('Failed to initiate database!')
    process.exit()
  }

  /*
  await db.get(
    'SELECT RANDOM() % 100 AS result',
    (_, res) => {
      console.log('random: ', res)
    }
  )
  */

  //this.error('error 1229!')
  this.exit(1)
  process.stdout.write(`example hook running ${opts.id}\n`)
}

export default sqlite 
