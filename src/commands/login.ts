import {Command, Flags} from '@oclif/core'
import * as inquirer from 'inquirer'

export default class Login extends Command {
  static description = 'Login to packdir.com'

  public async run(): Promise<void> {
    //const {args, flags} = await this.parse(Login)

    this.log('Login to packdir.com')
    const questions = [
      {
        type: 'input',
        name: 'email',
        message: 'Email:',
        default: ''
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:',
        default: ''
      }
    ]

    inquirer
      .prompt(questions)
      .then( async (answers) => {
        console.log('answers: ', answers, '')
        console.log('Created packdir.json successfully!')
      })
      .catch((err) => {
        console.log('Error: ', err)
      })

  }
}
