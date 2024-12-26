import { Module } from '@nestjs/common';
import { AuthController } from './application/controllers/auth.controller';
import { authExportProviders, authProviders, strategies, usecases } from './providers';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/models';
import { SharedModule } from '@app/shared';

@Module({
  imports: [SharedModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AuthController],
  providers: [...authProviders, ...usecases, ...strategies],
  exports: [...authExportProviders],
})
export class AuthModule {}
