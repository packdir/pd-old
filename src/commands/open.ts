import { Command, Flags } from '@oclif/core'
import { exec } from 'child_process'

export default class Open extends Command {
  static description = 'Open an file with default application.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

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
      // todo: Warns if file does not exist.
      exec(this.getCommandLine() + ' ' + args.filename)
    }
  }
}
