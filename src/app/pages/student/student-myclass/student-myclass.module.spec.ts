import { StudentMyclassModule } from './student-myclass.module';

describe('StudentMyclassModule', () => {
  let studentMyclassModule: StudentMyclassModule;

  beforeEach(() => {
    studentMyclassModule = new StudentMyclassModule();
  });

  it('should create an instance', () => {
    expect(studentMyclassModule).toBeTruthy();
  });
});
