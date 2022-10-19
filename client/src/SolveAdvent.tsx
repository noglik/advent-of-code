import { useState, FormEvent } from 'react';

const SolveAdvent = () => {
  const [error, setError] = useState<Error|undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    const formData = new FormData(e.currentTarget);

    const form = Object.fromEntries(formData);
    const body = {
      input: form.input,
      day: parseInt(form.day as string),
    }

    fetch(`/api/advent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        const errorMessage = (data && data.message) || res.statusText;
        return Promise.reject(Error(errorMessage));
      }

      setLoading(false);
      return Promise.resolve();
    })
    .catch((err: Error) => {
      setLoading(false);
      setError(err)
    })
  } 

  return (
    <div id="save-dna" className="mb-wrapper">
      <h4>Solve Advent of Code</h4>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="input" placeholder="Input*" required className="inp" disabled={loading} />
        <select name="day" className="sel">
          <option value="4">Day 4</option>
          <option value="5">Day 5</option>
          <option value="6">Day 6</option>
        </select>
        <button type="submit" className="btn" disabled={loading}>Save</button>
      </form>
      {error ? <p className="err">{error.message}</p> : null}
    </div>
  );
}

export default SolveAdvent;
