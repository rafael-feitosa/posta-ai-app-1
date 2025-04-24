import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
import NavBar from '../../components/NavBar/NavBar';
import Headings from '../../components/Headings/Headings';
import ArchiveSection from '../../components/ArchiveSection/ArchiveSection';
import Footer from '../../components/Footer/Footer';

const Archive = () => {
  return (
    <WrapperMain>
      <NavBar />
      <Headings
        pageTitle={'Tarefas arquivadas'}
        pageDescription={
          'Aquis estão listadas todas as suas tarefas com status de arqivadas.'
        }
      />
      <ArchiveSection />
      <Footer />
    </WrapperMain>
  );
};

export default Archive;
