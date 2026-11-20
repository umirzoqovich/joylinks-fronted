import { z } from 'zod';

/** Admin formalari uchun qayta ishlatiladigan zod sxemalari */

export const requiredText = (min = 2, message = "Maydonni to'ldiring") =>
  z.string().trim().min(min, message);

export const optionalText = z.string().trim();

export const optionalUrl = z
  .string()
  .trim()
  .refine((value) => value === '' || /^https?:\/\/\S+$/.test(value), "To'g'ri havola kiriting (https://...)");

export const intField = (min = 0, max?: number) => {
  let schema = z.coerce
    .number({ invalid_type_error: 'Raqam kiriting' })
    .int('Butun son kiriting')
    .min(min, `Kamida ${min}`);
  if (max !== undefined) schema = schema.max(max, `Ko'pi bilan ${max}`);
  return schema;
};

/** Bo'sh qoldirilishi mumkin bo'lgan raqam (forma ichida satr sifatida saqlanadi) */
export const optionalIntString = z
  .string()
  .trim()
  .regex(/^\d*$/, 'Faqat raqam kiriting');

export const slugField = z
  .string()
  .trim()
  .regex(/^([a-z0-9]+(?:-[a-z0-9]+)*)?$/, "Faqat kichik lotin harflari, raqam va '-'");

export const orderField = intField(0);
