import {
  randEmail,
  randFirstName,
  randLastName,
  randPassword,
  randPhoneNumber
} from "@ngneat/falso";

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export const userGenerator = () => {
  return {
    firstName: randFirstName(),
    lastName: randLastName(),
    email: randEmail(),
    phone: randPhoneNumber(),
    password: randPassword()
  } as UserInterface;
};
