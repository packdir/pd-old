import {Command, Flags} from '@oclif/core'

export default class Cp extends Command {
  static description = 'Copy files.'

  static flags = {
    target: Flags.string({char: 't', description: 'Target cloud storage'}),
  }

  // Allow multiple arguments to upload files.
  static strict = false

  static args = [{name: 'person', description: 'Person to say hello to', required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Cp)

    this.log(`hello ${args.person} from ${flags.from}! (./src/commands/hello/index.ts)`)
  }
}
