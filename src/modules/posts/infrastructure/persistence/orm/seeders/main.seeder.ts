import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PostEntity } from '../entities/post.entity';

export class MainSeeder implements Seeder {
  track?: boolean | undefined;
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const postSeederFactory = factoryManager.get(PostEntity);
    return await postSeederFactory.saveMany(10);
  }
}
