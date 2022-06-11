import { StudentAssignAndtestModule } from './student-assign-andtest.module';

describe('StudentAssignAndtestModule', () => {
  let studentAssignAndtestModule: StudentAssignAndtestModule;

  beforeEach(() => {
    studentAssignAndtestModule = new StudentAssignAndtestModule();
  });

  it('should create an instance', () => {
    expect(studentAssignAndtestModule).toBeTruthy();
  });
});
