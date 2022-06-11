import { AllProductsGuestModule } from './all-products-guest.module';

describe('AllProductsGuestModule', () => {
  let allProductsGuestModule: AllProductsGuestModule;

  beforeEach(() => {
    allProductsGuestModule = new AllProductsGuestModule();
  });

  it('should create an instance', () => {
    expect(allProductsGuestModule).toBeTruthy();
  });
});
