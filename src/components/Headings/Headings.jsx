import { WrapperHeadings } from '../../components/Wrapper/WrapperStyles';

const Headings = ({ pageTitle, pageDescription }) => {
  return (
    <WrapperHeadings className="bg-primary">
      <div className="flex flex-col gap-4 container">
        <h2 className="text-3xl font-bold text-light">{pageTitle}</h2>
        <p className="text-white">{pageDescription}</p>
      </div>
    </WrapperHeadings>
  );
};
export default Headings;
