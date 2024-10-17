import { useState } from 'react';
import { ForgotPasswordService } from "../services/ForgetPassword";
import { ForgotPasswordModel } from '../models/ForgetPassword';

export const useForgetPasswordController = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ForgotPasswordModel>({ email: '', otp: '', password: '', confirmPassword: '' });
  const [uuid, setUuid] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await ForgotPasswordService.sendEmailOtp(form.email);
      setUuid(response.uuid);
      setStep(2);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      if (uuid) {
        await ForgotPasswordService.verifyOtpAndChangePassword(uuid, form.otp, form.password);
        alert('Password changed successfully!');
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    };
  };
    return {
        step,
        loading,
        form,
        uuid,
        setStep,
        setForm,
        setLoading,
        setUuid,
        handleInputChange,
        handleOtpSubmit,
        handlePasswordSubmit,
        handleEmailSubmit
    };
};