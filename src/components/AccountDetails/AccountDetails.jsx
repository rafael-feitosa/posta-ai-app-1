import BtnPrimary from '../BtnPrimary/BtnPrimary';
import { WrapperOverview } from '../Wrapper/WrapperStyles';
import ConectedUsersData from '../ConectedUsersData/ConectedUsersData';

const AccountDetails = () => {
  return (
    <WrapperOverview className="container">
      <div className="row row-cols-1 g-4 container bg-light rounded-3 pb-5 pt-4 mx-auto">
        <div className="d-flex justify-content-between w-100">
          <h2>Confira seus dados</h2>
          <BtnPrimary
            toPage={'/my-account/edit-account'}
            BtnLabel={'Editar conta'}
          />
        </div>
        <div className="g-3">
          <ol className="list-group list-group-numbered">
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Nome:</div>
                <ConectedUsersData>
                  {(user) => <>{user?.name || 'Usuário sem nome definido'}</>}
                </ConectedUsersData>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">E-mail:</div>
                <ConectedUsersData>
                  {(user) => <>{user?.email || 'Usuário sem email definido'}</>}
                </ConectedUsersData>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">WhatsApp:</div>
                <ConectedUsersData>
                  {(user) => (
                    <>{user?.phoneNumber || 'Usuário sem telefone definido'}</>
                  )}
                </ConectedUsersData>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </WrapperOverview>
  );
};

export default AccountDetails;
