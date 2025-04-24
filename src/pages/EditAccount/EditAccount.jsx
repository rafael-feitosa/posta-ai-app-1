import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
import NavBar from '../../components/NavBar/NavBar';
import Headings from '../../components/Headings/Headings';
import EditAccountSection from '../../components/EditAccountSection/EditAccountSection';
import Footer from '../../components/Footer/Footer';

const EditAccount = () => {
  return (
    <WrapperMain>
      <NavBar />
      <Headings
        pageTitle={'Suas informações'}
        pageDescription={'Descrição para sua minha conta.'}
      />
      <EditAccountSection />
      <Footer />
    </WrapperMain>
  );
};

export default EditAccount;
