import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { PaginationQueryDto } from './dto/pagination-query.dto'
import { User } from './user.schema'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(@Query() paginationQuery: PaginationQueryDto): Promise<User[]> {
    return await this.userService.findAll(paginationQuery)
  }

  @Get('/:id')
  async getOneById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOneById(id)
  }

  @Get('/email/:email')
  async getOneByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.findOneByEmail(email)
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto)
  }

  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.userService.remove(id)
  }
}
