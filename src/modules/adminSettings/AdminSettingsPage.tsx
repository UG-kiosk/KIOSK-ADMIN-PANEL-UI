import AdminChangePasswordForm from './sections/AdminChangePassword/AdminChangePassword';
import AdminRegisterForm from './sections/AdminRegisterForm/AdminRegisterForm';

const AdminSettingsPage = () => {
  return (
    <div>
      <AdminChangePasswordForm />
      <AdminRegisterForm />
    </div>
  );
};

export default AdminSettingsPage;
