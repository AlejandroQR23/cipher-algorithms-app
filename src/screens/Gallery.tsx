import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { algorithmAPI, Algorithm } from '../api/algorithmAPI';

import Loading from '../components/Loading/loading.component';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/galery.scss';
import { useNavigate } from 'react-router-dom';

const INSTRUCTIONS = [
  'Select two algorithms of the same type to compare',
  'Select one more algorithm to compare',
  'You have already selected two algorithms',
];

const Gallery = () => {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<Algorithm[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let instructions = INSTRUCTIONS[selectedAlgorithms.length];

  useEffect(() => {
    if (selectedAlgorithms.length < 2) {
      return;
    }
    if (selectedAlgorithms[0].type !== selectedAlgorithms[1].type) {
      toast.error('You must select two algorithms of the same type');
    } else {
      navigate('/compare', { state: selectedAlgorithms });
    }
  }, [selectedAlgorithms]);

  useEffect(() => {
    (async () => {
      algorithmAPI
        .getAlgorithms()
        .then(data => {
          setAlgorithms(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    })();
  }, []);

  const handleSelectAlgorithm = (index: number) => {
    if (selectedAlgorithms.find(element => element.name === algorithms[index].name)) {
      setSelectedAlgorithms(selectedAlgorithms.filter(element => element !== algorithms[index]));
      return;
    }
    if (selectedAlgorithms.length < 2) {
      setSelectedAlgorithms([...selectedAlgorithms, algorithms[index]]);
    }
  };

  const handleAddClass = (index: number) => {
    if (selectedAlgorithms.find(element => element.name === algorithms[index].name)) {
      return 'selected';
    }
    return '';
  };

  return (
    <div className="hero">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="colored"
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="hero__subtitle">Gallery</h1>
          <p className="instructions">{instructions}</p>
          <div className="gallery">
            {algorithms.map((algorithm, index) => (
              <div
                className={'gallery__item ' + handleAddClass(index)}
                key={index}
                onClick={() => handleSelectAlgorithm(index)}
              >
                <h2 className="gallery__item__title">{algorithm.name}</h2>
                <p className="gallery__item__description">{algorithm.description}</p>
                <p className="gallery__item__pill">{algorithm.type}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
