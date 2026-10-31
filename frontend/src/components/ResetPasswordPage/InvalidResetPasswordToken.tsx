import { Link } from "react-router"
import { AuthLayout } from "../../layouts"

const InvalidResetPasswordToken = () => {
  return (
      <AuthLayout
        bannerText="A fresh start, and right back to it."
        title="This link isn't valid"
        description="It may have expired or already been used. Request a new one to continue."
      >
        <Link
          className="btn btn-block py-6 bg-TertiaryColor hover:bg-HoverBtnBg rounded-lg my-2"
          to="/forgot-password"
        >
          Request a new link
        </Link>
      </AuthLayout>
  )
}

export default InvalidResetPasswordToken
