import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
import NavBar from '../../components/NavBar/NavBar';
import Headings from '../../components/Headings/Headings';
import FormAddJob from '../../components/FormAddTask/FormAddTask';

const AddTask = () => {
  return (
    <WrapperMain>
      <NavBar />
      <Headings
        pageTitle={'Gerenciador de tarefas'}
        pageDescription={'Descrição para sua listagem de tarefas.'}
      />
      <FormAddJob />
    </WrapperMain>
  );
};

export default AddTask;
