import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from '../dto/create-user.dto'
import { PaginationQueryDto } from '../dto/pagination-query.dto'
import { User } from '../user.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async findAll(paginationQuery: PaginationQueryDto): Promise<User[]> {
    const { limit, offset } = paginationQuery

    return await this.userModel.find().skip(offset).limit(limit).exec()
  }

  public async findOneById(_id: string): Promise<User> {
    const _user = await this.userModel.findById({ _id }).exec()
    if (!_user) {
      throw new NotFoundException(`Пользователь #${_id} не найден`)
    }
    return _user
  }

  public async findOneByEmail(email: string): Promise<User> {
    const _user = await this.userModel.findOne({ email }).exec()
    if (!_user) {
      throw new NotFoundException(`Пользователь с email "${email}" не найден`)
    }
    return _user
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(createUserDto.password, salt)
    const _user = await new this.userModel({ ...createUserDto, password: hash })
    if (!_user) {
      throw new HttpException(
        'Не удалось создать нового пользователя',
        HttpStatus.BAD_REQUEST,
      )
    }
    return _user.save()
  }

  public async remove(_id: string): Promise<any> {
    const _user = await this.userModel.findByIdAndRemove(_id)
    if (!_user) {
      throw new HttpException(
        'Не удалось удалить пользователя',
        HttpStatus.BAD_REQUEST,
      )
    }
    return _user
  }
}
