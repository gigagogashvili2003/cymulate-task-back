import { UseCase } from '@app/shared/abstracts';
import { BadRequestException, Inject } from '@nestjs/common';
import { USER_SERVICE } from 'src/auth/constants';
import { UserService } from 'src/auth/domain/services/user.service';
import { CreateAttemptDto } from '../dtos';
import { ReceiverNotFoundException } from '@app/shared/exceptions/receiver-not-found.exception';
import { IUser } from 'src/auth/domain/types';
import { ATTEMPT_SERVICE } from 'src/attempts/constants';
import { AttemptService } from 'src/attempts/domain/services/attempt.service';
import { NodeMailerService } from '@app/mailer';

export class CreateAttemptUsecase implements UseCase<CreateAttemptDto & IUser, Promise<void>> {
  public constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
    @Inject(ATTEMPT_SERVICE) private readonly attemptService: AttemptService,
    @Inject() private readonly mailerService: NodeMailerService,
  ) {}

  public async execute(request?: CreateAttemptDto, currentUser?: IUser) {
    const { content, receiver } = request;

    if (currentUser.email === receiver) {
      throw new BadRequestException("You can't send an attempt to yourself");
    }

    const receiverExists = await this.userService.findOneByEmail(receiver);

    if (!receiverExists) {
      throw new ReceiverNotFoundException(receiver);
    }

    const newAttempt = await this.attemptService.create({ receiver, content: content, sender: currentUser.email });

    await this.mailerService.sendEmail(
      receiver,
      'Congratulations You Won 1BTC',
      `Click link here to collect it! https://localhost:3000/attempts/fake/${newAttempt._id.toString()}`,
    );
  }
}
