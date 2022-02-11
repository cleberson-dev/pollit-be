import { EncryptionService } from './../encryption/encryption.service'
import { UsersService } from './../users/users.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private encryptionService: EncryptionService,
    private jwtService: JwtService,
  ) {}

  async validateUser(emailOrUsername: string, plainPassword: string) {
    const user = await this.usersService.findUser(emailOrUsername)
    if (!user) return null

    const doPasswordsMatch = this.encryptionService.verify(
      plainPassword,
      user.password,
    )
    if (!doPasswordsMatch) return null

    const { password, ...result } = user

    return result
  }

  login(user: any) {
    const payload = {
      id: user.id,
    }

    return {
      success: true,
      message: 'User successfully logged in',
      token: this.jwtService.sign(payload),
    }
  }

  async register({
    email,
    password,
    username,
  }: {
    email: string
    password: string
    username?: string
  }) {
    const encryptedPassword = await this.encryptionService.encrypt(password)
    const { password: _, ...createdUser } = await this.usersService.create({
      email,
      password: encryptedPassword,
      username,
    })

    return {
      user: createdUser,
      token: this.jwtService.sign({ id: createdUser.id }),
    }
  }
}
