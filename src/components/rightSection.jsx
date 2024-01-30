import { useNavigate } from "react-router-dom";

export const SectionRight = () => {
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate("./dashboard");
  };
  return (
    <section className="right__section">
      <main>
        <h1>Sign In</h1>
        <h5>Sign in to your account</h5>
        <div>
          <p>
            <span className="googleIcon icon"></span>
            <span> Sign in with Google</span>
          </p>
          <p>
            <span className="appleIcon icon"></span>
            <span> Sign in with Apple</span>
          </p>
        </div>
        <section>
          <form className="formDetails">
            <p className="forminput">
              <label htmlFor="email">Email address</label>
              <input type="email" defaultValue="johndoe@gmail.com" />
            </p>
            <p className="forminput">
              <label htmlFor="password">Password</label>
              <input type="password" defaultValue="helloWorld" />
            </p>
            <p className="forgotPassword">Forgot Password?</p>
            <p className="forminput">
              <input
                type="submit"
                onClick={navigateToDashboard}
                className="submitButton"
                value="Sign In"
              />
            </p>
          </form>
          <div className="registeredLine">
            <span className="registerText">Don't have an account?</span>
            <span className="registerHighlight">Register here</span>
          </div>
        </section>
      </main>
      <section className="footer_mobile hide">
        <span className="social__icons"></span>
      </section>
    </section>
  );
};
