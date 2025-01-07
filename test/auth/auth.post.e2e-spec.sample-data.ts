import { faker } from '@faker-js/faker';

export const completeUser = {
  name: faker.person.firstName() + faker.person.lastName(),
  email: faker.internet.email(),
  password: 'raci123!?HER',
};

export const missingFirstName = {
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: 'raci123!?HER',
};

export const missingEmail = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: 'raci123!?HER',
};

export const missingPassword = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
};
