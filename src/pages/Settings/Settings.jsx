import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
import NavBar from '../../components/NavBar/NavBar';
import Headings from '../../components/Headings/Headings';
import SettingsSection from '../../components/SettingsSection/SettingsSection';
import Footer from '../../components/Footer/Footer';

const Settings = () => {
  return (
    <WrapperMain>
      <NavBar />
      <Headings
        pageTitle={'Configurações'}
        pageDescription={'Mantenha seus dados atualizados.'}
      />
      <SettingsSection />
      <Footer />
    </WrapperMain>
  );
};

export default Settings;
