import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from '../entities';

export class SettingRepository extends Repository<Setting> {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {
    super(
      settingRepository.target,
      settingRepository.manager,
      settingRepository.queryRunner,
    );
  }
}
