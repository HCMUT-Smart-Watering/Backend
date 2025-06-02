import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reading } from '../entities';

export class ReadingRepository extends Repository<Reading> {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,
  ) {
    super(
      readingRepository.target,
      readingRepository.manager,
      readingRepository.queryRunner,
    );
  }
}
