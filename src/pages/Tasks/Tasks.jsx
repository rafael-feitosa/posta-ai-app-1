import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
import NavBar from '../../components/NavBar/NavBar';
import Headings from '../../components/Headings/Headings';
import TasksSection from '../../components/TasksSection/TasksSection';
import Footer from '../../components/Footer/Footer';

const Archive = () => {
  return (
    <WrapperMain>
      <NavBar />
      <Headings
        pageTitle={'Tarefas'}
        pageDescription={
          'Aquis estão listadas todas as suas tarefas com status de arqivadas.'
        }
      />
      <TasksSection />
      <Footer />
    </WrapperMain>
  );
};

export default Archive;
