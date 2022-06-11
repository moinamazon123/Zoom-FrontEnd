import { TalentTestModule } from './talent-test.module';

describe('TalentTestModule', () => {
  let talentTestModule: TalentTestModule;

  beforeEach(() => {
    talentTestModule = new TalentTestModule();
  });

  it('should create an instance', () => {
    expect(talentTestModule).toBeTruthy();
  });
});
