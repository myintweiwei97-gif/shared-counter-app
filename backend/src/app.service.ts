import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Counter } from './counter.entity';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(Counter)
    private counterRepo: Repository<Counter>,
  ) {}

  async onModuleInit() {
    const count = await this.counterRepo.count();
    if (count === 0) {
      await this.counterRepo.save({ totalValue: 0 });
    }
  }

  async getValue(): Promise<Counter> {
    const data = await this.counterRepo.find();
    return data[0]; // <-- ဒီနေရာမှာ data[0] ဖြစ်ရပါမယ်
  }

  async addValue(amount: number): Promise<Counter> {
    const data = await this.getValue();
    data.totalValue += Number(amount);
    return this.counterRepo.save(data);
  }
}
