import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
import NavBar from '../../components/NavBar/NavBar';
import Headings from '../../components/Headings/Headings';
import AccountDetails from '../../components/AccountDetails/AccountDetails';
import Footer from '../../components/Footer/Footer';
import LogoutButton from '../../components/BtnPrimary/LogoutButton';

const MyAccount = () => {
  return (
    <WrapperMain>
      <NavBar />
      <Headings
        pageTitle={'Minha conta'}
        pageDescription={'Descrição para sua minha conta.'}
      />
      <AccountDetails />
      <div className="container mb-5">
        <LogoutButton />
      </div>
      <Footer />
    </WrapperMain>
  );
};

export default MyAccount;
