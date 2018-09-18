import { Test, TestingModule } from '@nestjs/testing';
import { PingController } from './ping.controller';

describe('Ping Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PingController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PingController = module.get<PingController>(PingController);
    expect(controller).toBeDefined();
  });
});
