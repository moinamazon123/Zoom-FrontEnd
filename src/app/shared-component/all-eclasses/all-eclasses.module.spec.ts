import { AllEclassesModule } from "./all-eclasses.module";

describe("AllEclassesModule", () => {
  let allEclassesModule: AllEclassesModule;

  beforeEach(() => {
    allEclassesModule = new AllEclassesModule();
  });

  it("should create an instance", () => {
    expect(allEclassesModule).toBeTruthy();
  });
});
