import { StudentCalenderModule } from './student-calender.module';

describe('StudentCalenderModule', () => {
  let studentCalenderModule: StudentCalenderModule;

  beforeEach(() => {
    studentCalenderModule = new StudentCalenderModule();
  });

  it('should create an instance', () => {
    expect(studentCalenderModule).toBeTruthy();
  });
});
