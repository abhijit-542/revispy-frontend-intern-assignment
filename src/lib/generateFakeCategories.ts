import { faker } from "@faker-js/faker";

export const generateFakeCategories = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: faker.commerce.department(),
  }));
};
