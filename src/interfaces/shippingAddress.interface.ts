import {
  rand,
  randBoolean,
  randCity,
  randCompanyName,
  randDepartment,
  randEmail,
  randFirstName,
  randFullAddress,
  randLastName,
  randPhoneNumber,
  randState,
  randZipCode
} from "@ngneat/falso";
import { Country, countryTypes } from "../types/country.type";

export interface ShippingAddressInterface {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  address: string;
  address_apartmentSuiteEtc: string;
  postalCode: string;
  city: string;
  country: Country;
  province: string;
  phone: string;
  shippingSameAsBilling: boolean;
}

export const shippingAddressGenerator = () => {
  return {
    email: randEmail(),
    firstName: randFirstName(),
    lastName: randLastName(),
    companyName: randCompanyName(),
    address: randFullAddress(),
    address_apartmentSuiteEtc: randDepartment(),
    postalCode: randZipCode(),
    city: randCity(),
    country: rand(countryTypes),
    province: randState(),
    phone: randPhoneNumber(),
    shippingSameAsBilling: randBoolean()
  } as ShippingAddressInterface;
};
