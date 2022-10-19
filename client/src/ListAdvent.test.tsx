import { render, screen, fireEvent, within } from '@testing-library/react';
import ListAdvent from './ListAdvent';
import { waitForFetch } from './utils/test';
import { records } from './mocks/handlers';

test('ListAdvent', async () => {
  render(<ListAdvent />);
  const searchButton = screen.getByRole('button', { name: "Retrieve" });

  fireEvent.click(searchButton);

  await waitForFetch([searchButton]);

  const table = screen.getByRole('table');
  records.forEach((rec) => {
    expect(within(table).getByText(rec.id)).toBeVisible();
    expect(within(table).getByText(rec.input)).toBeVisible();
    expect(within(table).getByText(rec.day)).toBeVisible();
    expect(within(table).getByText(rec.result)).toBeVisible();
  });
});

