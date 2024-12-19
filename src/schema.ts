import * as z from 'zod'

// I was initially using z.coerce... to coerce a number from a string but this was coercing '' as 0 and that was causing issues in the validation
const priceNumber = z
  .string()
  .refine((value) => value.trim() !== '', {
    message: 'Value is required.',
  })
  .transform((value) => Number(value))
  .refine((value) => !isNaN(value), {
    message: 'Must be a valid number.',
  })
  .refine((value) => value >= 0, {
    message: 'Number must be greater than 0',
  })
  .optional()

// Create zod validation schema for the form
export const formSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    priceRange: z.enum(['fixed', 'range']),
    minPrice: priceNumber,
    maxPrice: priceNumber,
  })
  .refine(
    (data) => {
      if (data.priceRange === 'fixed') {
        // Ensure both minPrice and maxPrice are present and valid
        return (
          typeof data.minPrice === 'number' && typeof data.maxPrice === 'number'
        )
      }
      return true
    },
    {
      message: 'Both Min and Max are required when Price Type is Fixed',
      path: ['minPrice', 'maxPrice'],
    }
  )
  .refine(
    (data) => {
      if (
        data.priceRange === 'fixed' &&
        data.minPrice !== undefined &&
        data.maxPrice !== undefined
      ) {
        return data.minPrice < data.maxPrice
      }
      return true
    },
    {
      message: 'Min must be less than Max',
      path: ['minPrice'],
    }
  )

export type FormSchemaType = z.infer<typeof formSchema>
