import { useState, FormEvent, FC } from 'react';
import './ListAdvent.css';

type SolutionRecords = Array<{id: string; input: string; day: number;result: number}>;

const NO_RECORDS_TEXT = 'No solutions yet';

const SolutionTable: FC<{ records: SolutionRecords}> = ({ records }) =>
  records.length > 0 ? 
    (<div className="table-container" role="table" aria-label="Solution records">
      <div className="row header" role="rowgroup">
        <div className="cell" role="columnheader">ID</div>
        <div className="cell" role="columnheader">Input</div>
        <div className="cell" role="columnheader">Day</div>
        <div className="cell" role="columnheader">Result</div>
      </div>
      {records.map((rec) => (<div key={rec.id} className="row" role="rowgroup">
        <div className="cell" role="cell" title={`${rec.id}`}>{rec.id}</div>
        <div className="cell" role="cell" title={rec.input}>{rec.input}</div>
        <div className="cell" role="cell" title={rec.day.toString()}>{rec.day}</div>
        <div className="cell" role="cell" title={rec.result.toString()}>{rec.result}</div>
      </div>))}
    </div>)
    : (<p>{NO_RECORDS_TEXT}</p>);

const ListSolutions = () => {
  const [records, setRecords] = useState<SolutionRecords | undefined>();
  const [error, setError] = useState<Error|undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);

    fetch(`/api/advent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        const errorMessage = (data && data.message) || res.statusText;
        return Promise.reject(Error(errorMessage));
      }

      setRecords(data);
      setLoading(false);
      return Promise.resolve();
    })
    .catch((err: Error) => {
      setRecords(undefined);
      setLoading(false);
      setError(err)
    })
  } 

  return (
    <div id="get-submissions">
      <h4>Retrieve previous submissions</h4>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="btn" disabled={loading}>Retrieve</button>
      </form>
      { error ? <p className="err">{error.message}</p> : null }
      { records ? (<SolutionTable records={records} />) : null }
    </div>
  );
}

export default ListSolutions;
