import { Link } from 'react-router';

const BtnPrimary = ({ BtnLabel, toPage }) => {
  return (
    <Link
      type="button"
      className="btn btn-primary d-flex align-items-center justify-content-center"
      to={toPage}
    >
      {BtnLabel}
    </Link>
  );
};

export default BtnPrimary;
