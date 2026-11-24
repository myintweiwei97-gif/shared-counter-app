// backend/src/app.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('counter')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCounter() {
    return this.appService.getValue();
  }

  @Post('add')
  addCounter(@Body('amount') amount: number) {
    return this.appService.addValue(amount);
  }
}
