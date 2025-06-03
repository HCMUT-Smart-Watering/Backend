import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { UserRepository } from '../repos';
import { Pagination } from 'src/common/types';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async findAll(user: Partial<User>, pagination: Pagination): Promise<User[]> {
    return await this.userRepository.find({
      where: { ...instanceToPlain(user) },
      withDeleted: true,
      skip: pagination.skip,
      take: pagination.limit,
    });
  }

  async findOne(user: Partial<User>): Promise<User> {
    const userData = await this.userRepository.findOneByOrFail({
      ...instanceToPlain(user),
    });
    return userData;
  }

  async findOneByUsername(username: string): Promise<User> {
    const userData = await this.userRepository.findOneByOrFail({ username });
    return userData;
  }

  async update(id: string, user: User): Promise<User> {
    const userData = await this.userRepository.findOneOrFail({
      where: { id },
    });
    const updatedUser = this.userRepository.merge(userData, user);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string): Promise<User> {
    const userData = await this.userRepository.findOneByOrFail({ id });
    const deletedUser = await this.userRepository.softRemove(userData);
    return deletedUser;
  }
}
