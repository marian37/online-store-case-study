import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToProducts = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  return (
    <div className="grid h-screen place-items-center">
      <button onClick={goToProducts} className="btn">
        Start shopping
      </button>
    </div>
  );
};

export default Home;
