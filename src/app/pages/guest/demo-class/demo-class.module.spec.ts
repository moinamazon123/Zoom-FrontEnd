import { DemoClassModule } from './demo-class.module';

describe('DemoClassModule', () => {
  let demoClassModule: DemoClassModule;

  beforeEach(() => {
    demoClassModule = new DemoClassModule();
  });

  it('should create an instance', () => {
    expect(demoClassModule).toBeTruthy();
  });
});
