// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Counter } from './counter.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // သင့် postgres username
      password: 'admin', // သင့် postgres password ထည့်ပါ
      database: 'shared_counter_db',
      entities: [Counter],
      synchronize: true, // Table အလိုအလျောက် ဆောက်ပေးရန်
    }),
    TypeOrmModule.forFeature([Counter]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
