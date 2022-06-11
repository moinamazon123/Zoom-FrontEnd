import { RecordedTeacherModule } from './recorded-teacher.module';

describe('RecordedTeacherModule', () => {
  let recordedTeacherModule: RecordedTeacherModule;

  beforeEach(() => {
    recordedTeacherModule = new RecordedTeacherModule();
  });

  it('should create an instance', () => {
    expect(recordedTeacherModule).toBeTruthy();
  });
});
