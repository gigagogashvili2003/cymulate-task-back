import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models';
import { Model } from 'mongoose';
import { UserCreationAttributes } from 'src/auth/domain/types/user.types';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  public createOne(attrs: UserCreationAttributes) {
    const newUser = new this.userModel(attrs);
    return newUser.save();
  }
}
