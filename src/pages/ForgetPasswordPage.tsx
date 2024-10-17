import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { InputOtp } from 'primereact/inputotp';
import { FloatLabel } from 'primereact/floatlabel';
import loginImage from '../assets/images/banner.svg';
import { useForgetPasswordController } from '../controller/ForgetPassword';

const ForgotPasswordPage: React.FC = () => {
  const {
    step,
    loading,
    form,
    setForm,
    handleInputChange,
    handleOtpSubmit,
    handlePasswordSubmit,
    handleEmailSubmit
  } = useForgetPasswordController();

  return (
    <div className="login-container">
      <div className="card login-card">
        <img src={loginImage} alt="Login Illustration" className="login-image" />
        {step === 1 && (
          <>
            <h2 className="login-title">Verify Email</h2>
            <form onSubmit={handleEmailSubmit} className="login-form">
              <FloatLabel className="input-group">
                <label htmlFor="email">Email</label>
                <InputText
                  id="email"
                  placeholder="Enter your Email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
              </FloatLabel>
              <Button label="Send OTP" loading={loading} type="submit" className="verify-button" />
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="login-title">Verify OTP</h2>
            <form onSubmit={handleOtpSubmit} className="login-form">
              <div className="input-group">
                <InputOtp value={form.otp} onChange={(e) => setForm({ ...form, otp: String(e.value) })} integerOnly length={6} />
              </div>
              <Button label="Verify OTP" loading={loading} type="submit" className="verify-button" />
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="login-title">Set New Password</h2>
            <form onSubmit={handlePasswordSubmit} className="login-form">
              <FloatLabel>
                <Password
                  id="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  placeholder="Password"
                  toggleMask
                  inputClassName="w-full"
                  className="bg-white-100 w-full"
                  pt={{ iconField: { root: { className: 'w-full' } } }}
                />
                <label htmlFor="password">New Password</label>
              </FloatLabel>
              <FloatLabel>
                <Password
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                  placeholder="Confirm Password"
                  toggleMask
                  inputClassName="w-full"
                  className="bg-white-100 w-full"
                  pt={{ iconField: { root: { className: 'w-full' } } }}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </FloatLabel>
              <Button label="Update Password" loading={loading} type="submit" className="verify-button" />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
