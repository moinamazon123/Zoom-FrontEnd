import { ParentProductModule } from './parent-product.module';

describe('ParentProductModule', () => {
  let parentProductModule: ParentProductModule;

  beforeEach(() => {
    parentProductModule = new ParentProductModule();
  });

  it('should create an instance', () => {
    expect(parentProductModule).toBeTruthy();
  });
});
