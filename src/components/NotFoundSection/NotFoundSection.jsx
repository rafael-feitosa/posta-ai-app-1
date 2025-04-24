import { WrapperOverview } from '../Wrapper/WrapperStyles';
import BtnPrimary from '../BtnPrimary/BtnPrimary';

const NotFoundSection = () => {
  return (
    <WrapperOverview className="container">
      <div className="row row-cols-1 row-cols-md-4 g-4 container bg-light rounded-3 pb-5 pt-4 mx-auto">
        <div className="row w-100 my-4">
          <h2 className="text-center">O que você está procurando?</h2>
        </div>

        <div className="d-flex w-100 justify-content-around mb-4">
          <BtnPrimary toPage={'/tasks'} BtnLabel={'Minhas tarefas'} />
          <BtnPrimary toPage={'/add-task'} BtnLabel={'Adicionar tarefa'} />
          <BtnPrimary toPage={'/my-account'} BtnLabel={'Minha conta'} />
          <BtnPrimary toPage={'/settings'} BtnLabel={'Configurações'} />
        </div>
      </div>
    </WrapperOverview>
  );
};
export default NotFoundSection;
