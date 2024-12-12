import { Module } from '@nestjs/common';
import { OrmPostPersistenceModule } from './persistence/orm/orm-persistence.module';
import { InMemoryPostPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';

@Module({})
export class PostsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm'
        ? OrmPostPersistenceModule
        : InMemoryPostPersistenceModule;

    return {
      module: PostsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
