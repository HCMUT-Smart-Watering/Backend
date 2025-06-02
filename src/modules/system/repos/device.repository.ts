import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../entities';

export class DeviceRepository extends Repository<Device> {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {
    super(
      deviceRepository.target,
      deviceRepository.manager,
      deviceRepository.queryRunner,
    );
  }
}
