import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Input,
  Radio,
  RadioGroup,
  Button,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

import { formSchema, type FormSchemaType } from './schema'

import styles from './Form.module.css'

export const Form = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    shouldUnregister: true,
  })

  const priceRange = watch('priceRange')
  const isPriceRangeFixed = priceRange === 'fixed'

  const saveData: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data)
  }

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(saveData)} className={styles.form}>
        <FormControl isInvalid={Boolean(errors.name?.message)}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            data-testid="name"
            id="name"
            type="text"
            {...register('name')}
          />
          {errors.name?.message ? (
            <FormErrorMessage>
              {errors.name.message.toString()}
            </FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl isInvalid={Boolean(errors.email?.message)}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            data-testid="email"
            id="email"
            type="email"
            {...register('email')}
          />
          {errors.email?.message ? (
            <FormErrorMessage>
              {errors.email.message.toString()}
            </FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="priceRange">Price Type</FormLabel>
          <RadioGroup
            name="priceRange"
            id="priceRange"
            defaultValue="range"
            className={styles.radioButtons}
          >
            <Radio value="fixed" {...register('priceRange')}>
              Fixed
            </Radio>
            <Radio value="range" {...register('priceRange')}>
              Range
            </Radio>
          </RadioGroup>
        </FormControl>

        {isPriceRangeFixed ? (
          <div className={styles.priceRange}>
            <FormControl isInvalid={Boolean(errors.minPrice?.message)}>
              <FormLabel htmlFor="minPrice">Min</FormLabel>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input
                  data-testid="minPrice"
                  id="minPrice"
                  type="number"
                  {...register('minPrice')}
                />
              </InputGroup>
              {errors.minPrice?.message ? (
                <FormErrorMessage>
                  {errors.minPrice.message.toString()}
                </FormErrorMessage>
              ) : null}
            </FormControl>

            <FormControl isInvalid={Boolean(errors.maxPrice?.message)}>
              <FormLabel htmlFor="maxPrice">Max</FormLabel>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input
                  data-testid="maxPrice"
                  id="maxPrice"
                  type="number"
                  {...register('maxPrice')}
                />
              </InputGroup>
              {errors.maxPrice?.message ? (
                <FormErrorMessage>
                  {errors.maxPrice.message.toString()}
                </FormErrorMessage>
              ) : null}
            </FormControl>
          </div>
        ) : null}

        <Button data-testid="submit-button" type="submit" colorScheme="blue">
          Submit
        </Button>
      </form>
    </div>
  )
}
