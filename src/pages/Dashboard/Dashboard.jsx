import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
import NavBar from '../../components/NavBar/NavBar';
import Headings from '../../components/Headings/Headings';
import Overview from '../../components/Overview/Overview';
import Footer from '../../components/Footer/Footer';
import ConectedUsersData from '../../components/ConectedUsersData/ConectedUsersData';

const Dashboard = () => {
  return (
    <WrapperMain>
      <NavBar />
      <ConectedUsersData>
        {(user) => (
          <>
            <Headings
              pageTitle={`Olá, ${user ? user.name || 'bom dia' : 'bom dia'}!`}
              pageDescription={'Bem-vindo ao seu gerenciador de tarefas.'}
            />
          </>
        )}
      </ConectedUsersData>
      <Overview />
      <Footer />
    </WrapperMain>
  );
};
export default Dashboard;
