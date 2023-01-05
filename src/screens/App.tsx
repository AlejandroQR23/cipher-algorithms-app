import { useNavigate } from 'react-router-dom';

import HeroImage from '../assets/images/Food.svg';
import Button from '../components/Button/button.component';

function App() {
  const navigate = useNavigate();
  return (
    <main>
      <div className="hero">
        <h1 className="hero__title">Cripto Cat</h1>
        <p className="hero__description">
          Discover, try and compare between our gallery of cipher algorithms. Get statistics of your comparisons to
          decide what algorithm fits your needs.
        </p>
        <Button
          text="Try it now"
          onClick={() => {
            navigate('/gallery');
          }}
        />
        <img src={HeroImage} alt="Hero" className="hero__image" />
      </div>
    </main>
  );
}

export default App;
