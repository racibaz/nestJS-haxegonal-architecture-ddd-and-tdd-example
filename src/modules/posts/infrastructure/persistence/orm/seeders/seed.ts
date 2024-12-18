import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { PostSeederFactory } from './post.seeder.factory';
import { MainSeeder } from './main.seeder';
import { PostEntity } from '../entities/post.entity';

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    //seeds: ['./*.seeder.ts'],
    //factories: ['./*.factory.ts'],
    type: 'postgres', //todo it can be getting from config
    database: 'postgres', //todo it can be getting from config
    entities: [PostEntity], //todo it can be getting from path
    factories: [PostSeederFactory],
    seeds: [MainSeeder],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
})();
