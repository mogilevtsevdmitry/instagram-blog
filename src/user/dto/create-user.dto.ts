import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail({}, { message: 'Указан некорректный email' })
  @IsNotEmpty({ message: 'Email не должен быть пустым' })
  @IsString()
  readonly email: string

  @IsNotEmpty({ message: 'Email не должен быть пустым' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  readonly password: string
}
