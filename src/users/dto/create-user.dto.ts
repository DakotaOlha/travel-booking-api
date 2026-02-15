import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Password123!', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'Іван' })
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Петренко' })
    @IsString()
    lastName: string;

    @ApiPropertyOptional({ example: '+380501234567' })
    @IsOptional()
    @IsString()
    phone?: string;
} 