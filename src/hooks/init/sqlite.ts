import { Hook } from '@oclif/core'
import * as path from 'path'
import * as os from 'os'
import { Database } from 'sqlite3'

const sqlite: Hook<'init'> = async function (opts) {
  // db file.
  const dbfile = path.join(os.homedir(), '.packdir', 'pd.sqlite3')
  const db = new Database(dbfile)

  await db.get(
    'SELECT RANDOM() % 100 AS result',
    (_, res) => {
      console.log('random: ', res)
    }
  )

  //this.error('error 1229!')
  //process.exit()
  this.exit(1)
  process.stdout.write(`example hook running ${opts.id}\n`)
}

export default sqlite 
