import { ManageStudentModule } from './manage-student.module';

describe('ManageStudentModule', () => {
  let manageStudentModule: ManageStudentModule;

  beforeEach(() => {
    manageStudentModule = new ManageStudentModule();
  });

  it('should create an instance', () => {
    expect(manageStudentModule).toBeTruthy();
  });
});
