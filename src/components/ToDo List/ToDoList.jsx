import { Link } from "react-router";

const Profile = () => {

  return (
    <>
      <div>
        <Link to='/'>Main page</Link>
        <h1>Hello from profile page!</h1>
        <p>So, how are you?</p>
        <hr />
        <h2>The profile visited is here:</h2>
      </div>
    </>
  );
};

export default Profile;