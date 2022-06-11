import { ProductAdminModule } from "./product-admin.module";

describe("ProductAdminModule", () => {
  let productAdminModule: ProductAdminModule;

  beforeEach(() => {
    productAdminModule = new ProductAdminModule();
  });

  it("should create an instance", () => {
    expect(productAdminModule).toBeTruthy();
  });
});
