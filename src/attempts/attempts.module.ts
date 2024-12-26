import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared';
import { MongooseModule } from '@nestjs/mongoose';
import { Attempt, AttemptSchema } from './infrastructure/models';
import { AttemptsController } from './application/controllers';
import { attemptProviders, usecases } from './providers';
import { AuthModule } from 'src/auth/auth.module';
import { MailerModule } from '@app/mailer';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    MailerModule,
    MongooseModule.forFeature([{ name: Attempt.name, schema: AttemptSchema }]),
  ],
  providers: [...attemptProviders, ...usecases],
  controllers: [AttemptsController],
})
export class AttemptsModule {}
