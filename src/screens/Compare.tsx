import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { algorithmAPI, CompareResults } from '../api/algorithmAPI';

import Button from '../components/Button/button.component';
import Loading from '../components/Loading/loading.component';
import Results from '../components/Results/results.component';

import '../styles/compare.scss';

const Compare = () => {
  let { state } = useLocation();
  const algorithms = state as Algorithm[];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');
  const [iterations, setIterations] = useState(0);
  const [results, setResults] = useState<CompareResults>();

  const handleStartComparison = async () => {
    setLoading(true);
    await algorithmAPI
      .compareAlgorithms({
        algo1: algorithms[0].name,
        algo2: algorithms[1].name,
        data,
        iterations,
      })
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.response.data);
        setError(error.response.data);
        setLoading(false);
      });
  };

  return (
    <div className="hero">
      <h1 className="hero__subtitle">
        Compare {algorithms[0].name} vs {algorithms[1].name}
      </h1>
      {loading ? (
        <Loading />
      ) : results ? (
        <Results results={results} />
      ) : (
        <>
          <p className="compare__instructions">
            You can enter data and number of iterations or you can go with the default values
          </p>
          {error && <p className="compare__error">{error}</p>}
          <div className="compare__form">
            <input
              className="compare__input"
              type="text"
              placeholder="Enter data"
              value={data}
              onChange={event => setData(event.target.value)}
            />
            <input
              className="compare__input"
              type="number"
              placeholder="Enter iterations"
              value={iterations}
              onChange={event => setIterations(+event.target.value)}
            />
          </div>
          <Button text="Start the comparison" onClick={() => handleStartComparison()} />
        </>
      )}
    </div>
  );
};

export default Compare;
