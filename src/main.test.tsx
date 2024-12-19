import { render, screen, userEvent } from './test-setup/test-utils.tsx'
export * from '@testing-library/react'

import { Form } from './Form'

test('Has basic fields', () => {
  render(<Form />)

  // Test that the basic inputs and submit button exist
  expect(screen.getByTestId('name')).toBeInTheDocument()
  expect(screen.getByTestId('email')).toBeInTheDocument()
  expect(screen.getByTestId('submit-button')).toBeInTheDocument()
})

test('Has fields that are shown conditionally', async () => {
  render(<Form />)

  // There are two radio buttons to show the price types
  expect(screen.getAllByRole('radio')).toHaveLength(2)

  // Test that the fixed amount input is shown when the fixed type is selected
  await userEvent.click(screen.getByTestId('fixed-type'))
  expect(screen.getByTestId('fixed-amount')).toBeInTheDocument()

  /* Test that the fixed amount input is hidden when the fixed type is selected,
   * and the min and max inputs are shown instead */
  await userEvent.click(screen.getByTestId('range-type'))
  expect(screen.queryByTestId('fixed-amount')).not.toBeInTheDocument()
  expect(screen.getByTestId('min-amount')).toBeInTheDocument()
  expect(screen.getByTestId('max-amount')).toBeInTheDocument()
})
