import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { RegDto } from './dto/login.dto';
import { Public } from './public.decorator';
@Public()
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('/reg')
  async reg(@Body() Body: RegDto) {
    console.log(Body);

    return this.loginService.register(Body)
  }

  @Post('/login')
  async login(@Body() { mobile_no, password }: { mobile_no: string, password: string }) {
    return this.loginService.login(mobile_no, password)
  }

}
