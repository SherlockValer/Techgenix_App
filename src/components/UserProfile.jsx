import useGlobalContext from "../context/globalContext";

const UserProfile = () => {
  const { user, setUser } = useGlobalContext();

  return (
    <div>
      <p className="pb-3 fw-bold text-danger fs-5">Personal Information</p>

      <section className="pb-5 pe-4 d-flex flex-column gap-4 ">
        <div className="d-flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="form-control "
            value={user.name}
            disabled
          />
          <input
            type="text"
            placeholder="Last Name"
            className="form-control "
            disabled
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            className="form-control "
            value={user.email}
            disabled
          />
        </div>

        <div>
          <input
            type="text"
            placeholder=""
            className="form-control "
            onChange={(e) => setLabel(e.target.value)}
            value={user.phoneNumber}
            disabled
          />
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
