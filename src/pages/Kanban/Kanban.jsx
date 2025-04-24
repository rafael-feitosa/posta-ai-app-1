import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
import NavBar from '../../components/NavBar/NavBar';
// import Headings from '../../components/Headings/Headings';
import KanbanContext from '../../components/KanbanContext/KanbanContext';
// import Footer from '../../components/Footer/Footer';

const Kanban = () => {
  return (
    <WrapperMain className="maxHeightTasks">
      <NavBar />
      {/* <Headings
        pageTitle={'Listagem de tarefas'}
        pageDescription={'Descrição para sua listagem de tarefas.'}
      /> */}
      <KanbanContext />
      {/* <Footer /> */}
    </WrapperMain>
  );
};

export default Kanban;
