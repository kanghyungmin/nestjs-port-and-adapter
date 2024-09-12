import { Nullable, Optional } from '@core/common/type/CommonType'
import { UserDITokens } from '@core/domain/user/di/UserDITokens'
import { User } from '@core/domain/user/entity/User'
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort'
import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { HttpJwtPayload, HttpKakaoUserPayload, HttpLoggedInUser, HttpUserPayload } from '@application/auth/type/HttpAuthTypes'
import { UserRole } from '@core/common/enum/UserEnums'

@Injectable()
export class HttpAuthService {
  
  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,
    
    private readonly jwtService: JwtService
  ) {}
  
  public async validateUser(username: string, password: string): Promise<Nullable<HttpUserPayload>> {
    const user: Optional<User> = await this.userRepository.findUser({email: username})
    
    if (user) {
      const isPasswordValid: boolean = await user.comparePassword(password)
      if (isPasswordValid) {
        return {id: user.getId(), email: user.getEmail(), role : user.getRole()}
      }
    }
    
    return null
  }
  
  public login(user: HttpUserPayload | HttpKakaoUserPayload): HttpLoggedInUser {
    const payload: HttpJwtPayload = { id: user.id }
    return {
      id: user.id,
      accessToken: this.jwtService.sign(payload),
    }
  }
  
  public async getUser(by: {id: string}): Promise<Optional<User>> {
    return this.userRepository.findUser(by)
  }

  public async getSocialUserWithSave(by: {socialID: string}): Promise<User> {

    let user: Optional<User> = await this.userRepository.findUser({socialID: by.socialID})

    if(!user) {
      user = await User.new({
        socialID: <string>by.socialID,
        // email: profile._json.kakao_account.email,
        role: UserRole.USER,
      })
      await this.userRepository.addUser(user)
    }
    return user
  }
}
