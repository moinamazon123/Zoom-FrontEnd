import { DemoClassesModule } from './demo-classes.module';

describe('DemoClassesModule', () => {
  let demoClassesModule: DemoClassesModule;

  beforeEach(() => {
    demoClassesModule = new DemoClassesModule();
  });

  it('should create an instance', () => {
    expect(demoClassesModule).toBeTruthy();
  });
});
