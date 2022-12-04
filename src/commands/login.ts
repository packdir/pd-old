import {Command, Flags} from '@oclif/core'
import * as inquirer from 'inquirer'
import axios from 'axios'
import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs-extra'

export default class Login extends Command {
  static description = 'Login'

  // Use email and password to login.
  public async run(): Promise<void> {
    //const {args, flags} = await this.parse(Login)

    this.log('Input your email address and password to login.')
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
    const questions = [
      {
        type: 'input',
        name: 'email',
        message: 'Email:',
        //default: '',
        validate: (email: string) => {
          if (!emailRegex.test(email)) {
            return 'Please enter a valid email address'
          }
          return true
        }
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:',
        //default: '',
        validate: (password: string) => {
          if (password.length < 6) {
            return 'Password must be at least 6 characters'
          }
          return true
        }
      }
    ]

    inquirer
      .prompt(questions)
      .then( async (answers) => {
        //console.log('answers: ', answers, '')

        const url = 'https://packdir.com/api/v1/login'
        try {
          const response = await axios.post(url, answers)
          if (response.status === 200 && response.data.token) {
            // No need to check if the directory exists.
            // Because the directory will be created if it does not exist with outputFileSync.
            //const configPath = path.join(os.homedir(), '.packdir')
            //const mode = 0o775
            //fs.ensureDirSync(configPath, mode)
            console.log('homedir: ', os.homedir())

            const tokenfile = path.join(os.homedir(), '.packdir', 'token')
            fs.outputFileSync(tokenfile, response.data.token)
            console.log('Login successful!OKEND: ')
          } else {
            console.error('Error! Login failed.')
          }
        } catch (err) {
          console.error('Error! Failed to login.')
        }
      })
      .catch(err => {
        console.error('Error! Failed to login.')
      })

  }
}
