import { EClassesModule } from './e-classes.module';

describe('EClassesModule', () => {
  let eClassesModule: EClassesModule;

  beforeEach(() => {
    eClassesModule = new EClassesModule();
  });

  it('should create an instance', () => {
    expect(eClassesModule).toBeTruthy();
  });
});
