import { AssignmentTestModule } from './assignment-test.module';

describe('AssignmentTestModule', () => {
  let assignmentTestModule: AssignmentTestModule;

  beforeEach(() => {
    assignmentTestModule = new AssignmentTestModule();
  });

  it('should create an instance', () => {
    expect(assignmentTestModule).toBeTruthy();
  });
});
