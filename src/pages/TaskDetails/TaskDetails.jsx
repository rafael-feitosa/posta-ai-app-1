import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
import NavBar from '../../components/NavBar/NavBar';
import Headings from '../../components/Headings/Headings';
import TaskDetailsSection from '../../components/TaskDetailsSection/TaskDetailsSection';

const TaskDetails = () => {
  return (
    <WrapperMain>
      <NavBar />
      <Headings
        pageTitle={'Detalhes da tarefas'}
        pageDescription={'Descrição para sua listagem de tarefas.'}
      />
      <TaskDetailsSection />
    </WrapperMain>
  );
};

export default TaskDetails;
