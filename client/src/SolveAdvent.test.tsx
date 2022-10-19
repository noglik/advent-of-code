import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SolveAdvent from './SolveAdvent';
import { disabilityExpectation, waitForFetch } from './utils/test';

// Basically several tests are written in one, to imitate users behavior
test('SolveAdvent', async () => {
  render(<SolveAdvent />);
  const input = screen.getByPlaceholderText(/input*/i);
  const saveButton = screen.getByText(/save/i);

  // type request failing sequence
  fireEvent.change(input, { target: { value: 'fail' } });

  // add
  fireEvent.click(saveButton);

  // checks disabled/enabled
  await waitForFetch([input, saveButton]);

  // check error text present
  const errorText = screen.getByText(/Something went wrong/i);
  expect(errorText).toBeVisible();

  // type correct sequence
  fireEvent.change(input, { target: { value: 'real' } });

  // add
  fireEvent.click(saveButton);

  await waitFor(() => disabilityExpectation([input, saveButton], true));

  // remove error text during fetch execution
  expect(errorText).not.toBeVisible();

  await waitFor(() => disabilityExpectation([input, saveButton], false));
});

