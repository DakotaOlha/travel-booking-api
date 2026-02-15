import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) { }

    @Post('register')
    @ApiOperation({ summary: 'Реєстрація нового користувача' })
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return {
            message: 'Користувача успішно зареєстровано',
            user,
        };
    }

    @Post('login')
    @ApiOperation({ summary: 'Авторизація користувача' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}