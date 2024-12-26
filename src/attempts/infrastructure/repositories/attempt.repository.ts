import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attempt, AttemptDocument, AttemptStatus } from '../models';
import { Model, Schema } from 'mongoose';
import { IAttemptRepository } from '../interfaces/attempt-repository.interface';
import { AttemptCreationAttributes } from 'src/attempts/domain/types';
import { IUser } from 'src/auth/domain/types';

@Injectable()
export class AttemptRepository implements IAttemptRepository {
  constructor(
    @InjectModel(Attempt.name)
    private readonly attemptModel: Model<AttemptDocument>,
  ) {}

  public createOne(attrs: AttemptCreationAttributes) {
    const newAttempt = new this.attemptModel({ ...attrs, status: AttemptStatus.NotClicked });
    return newAttempt.save();
  }
  public getManyByUser(user: IUser): Promise<AttemptDocument[]> {
    return this.attemptModel.find({ sender: user.email });
  }

  public findOneById(id: string): Promise<AttemptDocument> {
    return this.attemptModel.findOne({ _id: id });
  }
}
