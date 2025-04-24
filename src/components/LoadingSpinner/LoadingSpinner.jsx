import { ScaleLoader } from 'react-spinners';

const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <ScaleLoader color="#007bff" size={50} />
  </div>
);

export default LoadingSpinner;
