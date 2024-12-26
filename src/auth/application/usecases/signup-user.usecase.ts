import { UseCase } from '@app/shared/abstracts';
import { SignupUserDto } from '../dtos/signup-user.dto';
import { Inject } from '@nestjs/common';
import { USER_SERVICE } from 'src/auth/constants';
import { UserService } from 'src/auth/domain/services/user.service';
import { EmailTakenException } from '@app/shared/exceptions';
import { CryptoUtils } from '@app/shared/utils';

export class SignupUserUsecase implements UseCase<SignupUserDto, Promise<void>> {
  public constructor(@Inject(USER_SERVICE) private readonly userService: UserService) {}

  public async execute(request?: SignupUserDto) {
    const { email, fullName, password } = request;

    const userExists = await this.userService.findOneByEmail(email);

    if (userExists) {
      throw new EmailTakenException(email);
    }

    const hashedPassword = await CryptoUtils.hashPassword(password);

    await this.userService.create({ email, fullName, password: hashedPassword });
  }
}
