import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemPreset } from '../entities';

export class SystemPresetRepository extends Repository<SystemPreset> {
  constructor(
    @InjectRepository(SystemPreset)
    private readonly presetRepository: Repository<SystemPreset>,
  ) {
    super(
      presetRepository.target,
      presetRepository.manager,
      presetRepository.queryRunner,
    );
  }
}
