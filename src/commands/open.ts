import { Command, Flags } from '@oclif/core'
import { exec } from 'child_process'
import { existsSync } from 'fs'

export default class Open extends Command {
  static description = 'Open a file with the default application.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = [{name: 'filename', required: true}]

  /**
   * Get the start command on different OS.
   * @returns Start command
   */
  public getCommandLine(): string {
    switch (process.platform) {
      case 'darwin' : return 'open';
      case 'win32' : return 'start';
      default : return 'xdg-open';
    }
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Open)
    if (args.filename) {
      if (existsSync(args.filename)) {
        exec(this.getCommandLine() + ' ' + args.filename)
      } else {
        console.log(`File ${args.filename} does NOT exist!`)
      }
    }
  }
}
