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
    reValidateMode: 'onChange',
    shouldUnregister: true,
  })

  const priceType = watch('price.type')
  const isPriceTypeFixed = priceType === 'fixed'

  // console.log('errors', errors)
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
          <FormLabel htmlFor="price.type">Price Type</FormLabel>
          <RadioGroup
            id="priceRange"
            defaultValue="fixed"
            className={styles.radioButtons}
          >
            <Radio
              value="fixed"
              {...register('price.type')}
              data-testid="fixed-type"
            >
              Fixed
            </Radio>
            <Radio
              value="range"
              {...register('price.type')}
              data-testid="range-type"
            >
              Range
            </Radio>
          </RadioGroup>
        </FormControl>

        {isPriceTypeFixed ? (
          <FormControl isInvalid={Boolean(errors.price?.amount?.message)}>
            <FormLabel htmlFor="price.amount">Amount</FormLabel>
            <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
              <Input
                data-testid="fixed-amount"
                id="minPrice"
                type="number"
                {...register('price.amount')}
              />
            </InputGroup>
            {errors.price?.amount?.message ? (
              <FormErrorMessage>
                {errors.price?.amount?.message.toString()}
              </FormErrorMessage>
            ) : null}
          </FormControl>
        ) : (
          <div className={styles.priceRange}>
            <FormControl
              isInvalid={Boolean(errors.price?.amount?.min?.message)}
            >
              <FormLabel htmlFor="price.amount.min">Min</FormLabel>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input
                  data-testid="min-amount"
                  id="minPrice"
                  type="number"
                  {...register('price.amount.min')}
                />
              </InputGroup>
              {errors.price?.amount?.min?.message ? (
                <FormErrorMessage>
                  {errors.price?.amount?.min?.message.toString()}
                </FormErrorMessage>
              ) : null}
            </FormControl>

            <FormControl
              isInvalid={Boolean(errors.price?.amount?.max?.message)}
            >
              <FormLabel htmlFor="price.amount.max">Max</FormLabel>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input
                  data-testid="max-amount"
                  id="maxPrice"
                  type="number"
                  {...register('price.amount.max')}
                />
              </InputGroup>
              {errors.price?.amount?.max?.message ? (
                <FormErrorMessage>
                  {errors.price?.amount?.max?.message.toString()}
                </FormErrorMessage>
              ) : null}
            </FormControl>
          </div>
        )}

        <Button data-testid="submit-button" type="submit" colorScheme="blue">
          Submit
        </Button>
      </form>
    </div>
  )
}
