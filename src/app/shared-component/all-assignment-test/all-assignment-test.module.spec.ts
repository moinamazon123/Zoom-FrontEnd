import { AllAssignmentTestModule } from './all-assignment-test.module';

describe('AllAssignmentTestModule', () => {
  let allAssignmentTestModule: AllAssignmentTestModule;

  beforeEach(() => {
    allAssignmentTestModule = new AllAssignmentTestModule();
  });

  it('should create an instance', () => {
    expect(allAssignmentTestModule).toBeTruthy();
  });
});
