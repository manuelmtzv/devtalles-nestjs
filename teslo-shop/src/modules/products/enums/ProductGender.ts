export const ProductGender = {
  MALE: 'Men',
  WOMEN: 'Women',
  KID: 'Kid',
  UNISEX: 'Unisex',
} as const;

export type ProductGenderType =
  (typeof ProductGender)[keyof typeof ProductGender];

export const ProductGenderValues = Object.values(ProductGender);
