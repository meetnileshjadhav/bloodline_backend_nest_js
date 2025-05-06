// app.controller.ts - Handles incoming requests and delegates to services

import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @desc     Root endpoint
  // @route    GET /
  // @access   Public
  @Get()
  getHello(): string {
    try {
      return this.appService.getHello();
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
