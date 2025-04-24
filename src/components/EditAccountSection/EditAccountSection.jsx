import BtnPrimary from '../BtnPrimary/BtnPrimary';
import { WrapperOverview } from '../Wrapper/WrapperStyles';
const EditAccountSection = () => {
  return (
    <WrapperOverview className="container">
      <div className="row row-cols-1 g-4 container bg-light rounded-3 pb-5 pt-4 mx-auto">
        <div className="d-flex justify-content-between w-100">
          <h2>Mantenha seus dados atualizados</h2>
          <BtnPrimary toPage={'/my-account'} BtnLabel={'Minha conta'} />
        </div>
        <div className="g-3">
          <form className="d-flex flex-column gap-3">
            <div className="form-group">
              <label htmlFor="cpfCnpj">CPF/CNPJ</label>
              <input
                type="text"
                className="form-control"
                id="cpfCnpj"
                placeholder="Digite seu CPF ou CNPJ"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                placeholder="Digite seu nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="form-group">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input
                type="tel"
                className="form-control"
                id="whatsapp"
                placeholder="Digite seu WhatsApp"
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkDados"
              />
              <label className="form-check-label" htmlFor="checkDados">
                Tem certeza que deseja atualizar seus dados?
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-25">
              Atualizar dados
            </button>
          </form>
        </div>
      </div>
    </WrapperOverview>
  );
};

export default EditAccountSection;
