import { Test, TestingModule } from '@nestjs/testing';
import { HasherServiceService } from './hasher-service';

describe('HasherServiceService', () => {
  let service: HasherServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HasherServiceService],
    }).compile();

    service = module.get<HasherServiceService>(HasherServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
