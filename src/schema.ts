import * as z from 'zod'

// I was initially using z.coerce... to coerce a number from a string but this was coercing '' as 0 and that was causing issues in the validation
const priceNumber = z
  .string()
  .refine((value) => value.trim() !== '', {
    message: 'Value is required.',
  })
  .transform((value) => Number(value))
  .refine((value) => !isNaN(value), {
    message: 'Expected number, received string',
  })
  .refine((value) => value >= 0, {
    message: 'Number must be greater than 0',
  })

// Create zod validation schema for the form
export const formSchema = z
  .object({
    name: z.string().min(1).max(10),
    email: z.string().email(),
    price: z
      .object({
        type: z.enum(['fixed', 'range']),
        amount: z.union([
          z.union([z.number(), priceNumber]),
          z.object({
            min: z.union([z.number(), priceNumber]),
            max: z.union([z.number(), priceNumber]),
          }),
        ]),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.price?.type === 'range') {
        // Ensure both price.amount.min and price.amount.max are present and valid
        if (typeof data.price.amount === 'object') {
          return (
            typeof data.price.amount?.min === 'number' &&
            typeof data.price.amount?.max === 'number'
          )
        }
      }
      return true
    },
    {
      message: 'Both Min and Max are required when Price Type is Range',
      path: ['price.amount.min', 'price.amount.max'],
    }
  )
  .refine(
    (data) => {
      if (
        typeof data.price?.amount === 'object' &&
        data.price.type === 'range' &&
        data.price.amount?.min !== undefined &&
        data.price.amount?.max !== undefined
      ) {
        return data.price.amount.min < data.price.amount.max
      }
      return true
    },
    {
      message: 'Min must be less than max',
      path: ['price.amount.min'],
    }
  )

export type FormSchemaType = z.infer<typeof formSchema>
