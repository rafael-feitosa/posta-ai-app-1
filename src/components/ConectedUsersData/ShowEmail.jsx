import ConectedUsersData from '../ConectedUsersData/ConectedUsersData';

const ShowEmail = () => {
  return (
    <ConectedUsersData>
      {(user) => (
        <>
          {user ? (
            <span className="mx-3 text-white text-decoration-underline">
              {user.email}
            </span>
          ) : null}
        </>
      )}
    </ConectedUsersData>
  );
};

export default ShowEmail;
