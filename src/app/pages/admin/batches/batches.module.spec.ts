import { BatchesModule } from './batches.module';

describe('BatchesModule', () => {
  let batchesModule: BatchesModule;

  beforeEach(() => {
    batchesModule = new BatchesModule();
  });

  it('should create an instance', () => {
    expect(batchesModule).toBeTruthy();
  });
});
