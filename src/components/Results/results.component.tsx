import { Chart } from 'react-google-charts';
import { Link } from 'react-router-dom';

import { CompareResults } from '../../api/algorithmAPI';

import './results.styles.scss';

interface ResultsProps {
  results: CompareResults;
}

const Results = ({ results }: ResultsProps) => {
  const encryption = [
    ['Results', results.best_encryption.winner, results.best_encryption.loser],
    [
      'Time in microseconds',
      results.best_encryption.time,
      results.best_encryption.time + results.best_encryption.difference,
    ],
  ];

  const encryptionOptions = {
    chart: {
      title: 'Encryption',
      subtitle: 'Average time to encrypt',
    },
  };

  const decryptionOptions = {
    chart: {
      title: 'Decryption',
      subtitle: 'Average time to decrypt',
    },
  };

  let decryption;
  if (results.best_decryption) {
    decryption = [
      ['Results', results.best_decryption.winner, results.best_decryption.loser],
      [
        'Time in microseconds',
        results.best_decryption.time,
        results.best_decryption.time + results.best_decryption.difference,
      ],
    ];
  }
  return (
    <>
      <div className="results">
        <div className="results__item">
          <Chart width={'100%'} height={'200px'} chartType="Bar" data={encryption} options={encryptionOptions} />
        </div>
        {results.best_decryption && (
          <div className="results__item">
            {decryption && (
              <Chart width={'100%'} height={'200px'} chartType="Bar" data={decryption} options={decryptionOptions} />
            )}
          </div>
        )}
      </div>
      <Link to={'/gallery'}>Go back to gallery</Link>
    </>
  );
};

export default Results;
