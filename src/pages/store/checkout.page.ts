import { rand } from "@ngneat/falso";
import { Locator, Page, test } from "@playwright/test";
import { Builder } from "builder-pattern";

import {
  shippingAddressGenerator,
  ShippingAddressInterface
} from "../../interfaces/shippingAddress.interface";
import { FooterPage } from "./footer.page";
import { HeaderPage } from "./header.page";
import { OrderConfirmedPage } from "./orderConfirmed.page";
import { StoreBasePage } from "./store.base.page";

export class CheckoutPage extends StoreBasePage {
  static pageName = "Checkout";
  header: HeaderPage;
  footer: FooterPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
  }

  public async completeCheckout(
    shippingAddress: ShippingAddressInterface = Builder(
      shippingAddressGenerator()
    )
      .shippingSameAsBilling(true)
      .build()
  ): Promise<OrderConfirmedPage> {
    return test.step(`${CheckoutPage.pageName} - Complete Checkout`, async () => {
      await this.fillShippingAddress(shippingAddress);
      await this.pickDeliveryMethod();
      await this.pickPaymentMethod();
      return await this.checkOut();
    });
  }

  static sectionsStringLocator = "//div[contains(@class,'p-6')]";
  private sections = this.page.locator(CheckoutPage.sectionsStringLocator);

  totalSection = this.findSection("Total", "span");
  checkOutButton = this.totalSection.getByRole("button");

  public async checkOut(): Promise<OrderConfirmedPage> {
    return test.step(`${CheckoutPage.pageName} - Check Out`, async () => {
      await this.checkOutButton.click();
      await this.page.waitForURL("**/order/confirmed/**");
      return new OrderConfirmedPage(this.page);
    });
  }

  discountSection = this.findSection("Discount", "h3");
  giftCardSection = this.findSection("Gift Card", "h3");

  private findSection(title: string, elementType: string): Locator {
    return this.sections.locator(
      `//${elementType}[text()="${title}"]/ancestor::${CheckoutPage.sectionsStringLocator.slice(
        2
      )}`
    );
  }

  shippingAddressSection = this.page.locator(
    "//h2[text()='Shipping address']/../../.."
  );

  email = this.shippingAddressSection.locator("//input[@name='email']");
  firstName = this.shippingAddressSection.locator(
    "//input[@name='shipping_address.first_name']"
  );

  lastName = this.shippingAddressSection.locator(
    "//input[@name='shipping_address.last_name']"
  );

  companyName = this.shippingAddressSection.locator(
    "//input[@name='shipping_address.company']"
  );

  address = this.shippingAddressSection.locator(
    "//input[@name='shipping_address.address_1']"
  );

  address_apartmentSuiteEtc = this.shippingAddressSection.locator(
    "//input[@name='shipping_address.address_2']"
  );

  postalCode = this.shippingAddressSection.locator(
    "//input[@name='shipping_address.postal_code']"
  );

  city = this.shippingAddressSection.locator(
    "//input[@name='shipping_address.city']"
  );

  country = this.shippingAddressSection.locator(
    "//select[@name='shipping_address.country_code']"
  );

  province = this.shippingAddressSection.locator(
    "//input[@name='shipping_address.province']"
  );

  phone = this.shippingAddressSection.locator(
    "//input[@name='shipping_address.phone']"
  );

  shippingSameAsBillingCheckbox = this.shippingAddressSection.locator(
    "//div[@role='checkbox']/ancestor::button"
  );

  continueToDeliveryButton = this.shippingAddressSection.locator(
    "//button[text()='Continue to delivery']"
  );

  public async fillShippingAddress(shippingAddress: ShippingAddressInterface) {
    return test.step(`${CheckoutPage.pageName} - Fill Shipping Address`, async () => {
      await this.email.fill(shippingAddress.email);
      await this.firstName.fill(shippingAddress.firstName);
      await this.lastName.fill(shippingAddress.lastName);
      await this.companyName.fill(shippingAddress.companyName);
      await this.address.fill(shippingAddress.address);
      await this.address_apartmentSuiteEtc.fill(
        shippingAddress.address_apartmentSuiteEtc
      );
      await this.postalCode.fill(shippingAddress.postalCode);
      await this.city.fill(shippingAddress.city);
      await this.country.selectOption(shippingAddress.country);
      await this.province.fill(shippingAddress.province);
      await this.phone.fill(shippingAddress.phone);
      if (
        (await this.shippingAddressSection.getAttribute("aria-checked")) !=
        String(shippingAddress.shippingSameAsBilling)
      ) {
        await this.shippingSameAsBillingCheckbox.check();
      }
      await this.continueToDeliveryButton.click();
      await this.deliveryRadioButtons.first().waitFor({ state: "visible" });
    });
  }

  deliverySection = this.page.locator("//h2[text()='Delivery']/../../..");
  deliveryRadioButtons = this.deliverySection.getByRole("radio");

  public async pickDeliveryMethod() {
    return test.step(`${CheckoutPage.pageName} - Pick Delivery Method`, async () => {
      const deliveryMethods = await this.deliveryRadioButtons.all();
      await deliveryMethods[
        rand(Array.from(Array(deliveryMethods.length).keys()))
      ].click();
      await this.paymentRadioButtons.first().waitFor({ state: "visible" });
    });
  }

  paymentSection = this.page.locator("//h2[text()='Payment']/../../..");
  paymentRadioButtons = this.paymentSection.getByRole("button");

  public async pickPaymentMethod() {
    return test.step(`${CheckoutPage.pageName} - Pick Payment Method`, async () => {
      const paymentMethods = await this.paymentRadioButtons.all();
      await paymentMethods[
        rand(Array.from(Array(paymentMethods.length).keys()))
      ].click();
    });
  }
}
