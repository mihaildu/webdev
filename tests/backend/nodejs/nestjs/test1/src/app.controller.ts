import { Controller, Get, HttpCode, Req } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service';

// root path here
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('path')
  @HttpCode(200)
  getHello(): string {
    // status code 200 by default
    // other decorators: @Res, @Header, @Redirect
    return this.appService.getHello();
  }

  @Get('secret')
  secret(@Req() request: Request): string {
    // access to request object
    //console.log(request);
    // you can throw errors
    // throw new HttpException('message', HttpStatus.code);
    // Http status is in @nestjs/common
    return 'secret';
  }
}
