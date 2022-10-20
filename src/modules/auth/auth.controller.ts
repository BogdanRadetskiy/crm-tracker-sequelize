import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';

import { TokenInterceptor } from '@shared/interseptors';
import { AuthService } from '@modules/auth/auth.service';
import { SignUpRequestDto, SignInRequestDto } from '@modules/auth/dto';
import { UserResponseDto } from '@modules/user/dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiExcludeEndpoint()
  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Registration' })
  @ApiOkResponse({ type: UserResponseDto, description: 'Successfully created user' })
  @ApiBadRequestResponse({ description: 'Incorrect registration data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async register(@Body() signUpDto: SignUpRequestDto): Promise<UserResponseDto> {
    return this.authService.registration(signUpDto);
  }

  @ApiExcludeEndpoint()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Login' })
  @UseInterceptors(TokenInterceptor)
  async login(@Body() signInDto: SignInRequestDto): Promise<UserResponseDto> {
    return this.authService.login(signInDto);
  }
}
