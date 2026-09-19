import { Link } from "react-router";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

const Welcome = () => {
  return (
    <AuthLayout
      bannerText="Find someone worth the wait."
      title="Find someone worth the wait."
      description="Three questions, one photo, and you're in. Matching starts the moment you land."
    >
      <Link
        className="btn btn-block py-6 bg-TertiaryColor hover:bg-HoverBtnBg rounded-lg my-2"
        to="/signup"
      >
        Create an account
      </Link>
      <Link
        className="btn btn-block py-6 bg-PrimaryDarkBgColor hover:bg-InputBg rounded-lg border border-PrimaryColor my-2"
        to="/login"
      >
        I already have an account
      </Link>
      <p className="my-4 text-SecondaryColor text-sm">
        By continuing you agree to Ember's Terms of Service and acknowledge the
        Privacy Policy.
      </p>
    </AuthLayout>
  );
};

export default Welcome;
