import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System } from '../entities';

export class SystemRepository extends Repository<System> {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
  ) {
    super(
      systemRepository.target,
      systemRepository.manager,
      systemRepository.queryRunner,
    );
  }
}
