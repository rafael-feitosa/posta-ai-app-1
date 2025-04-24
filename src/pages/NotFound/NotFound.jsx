import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
import NavBar from '../../components/NavBar/NavBar';
import Headings from '../../components/Headings/Headings';
import NotFoundSection from '../../components/NotFoundSection/NotFoundSection';
import Footer from '../../components/Footer/Footer';
import BtnPrimary from '../../components/BtnPrimary/BtnPrimary';

const NotFound = () => {
  return (
    <WrapperMain>
      <NavBar />
      <Headings
        pageTitle={'Desculpe, a página que você está procurando não existe.'}
        pageDescription={'Aproveite ao máximo o seu gerenciador de tarefas.'}
      />
      <NotFoundSection />
      {/* <section className="notFound container py-5 mb-5 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-center">Página não encontrada :/</h1>
        <p className="text-center">
          Desculpe, a página que você está procurando não existe.
        </p>
        <BtnPrimary toPage={'/'} BtnLabel={'Dashboard'} />
      </section> */}
      <Footer />
    </WrapperMain>
  );
};
export default NotFound;
// This is a simple dashboard component that displays a welcome message.
