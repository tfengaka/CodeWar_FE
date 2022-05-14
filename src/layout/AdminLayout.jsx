import Button from 'components/Button';
import SideBar from 'components/SideBar';
import { useAuth } from 'hooks/useAuth';
import * as React from 'react';
import { AdminRoutes } from 'routes';

export function AdminLayout() {
  const auth = useAuth();
  return (
    <div className="admin">
      <div className="admin_header">
        <div className="admin_header_account">
          <span>{auth.user.fullName}</span>
          <Button backgroundColor="blue" onClick={() => auth.signOut()}>
            Đăng xuất
          </Button>
        </div>
      </div>
      <SideBar />
      <div className="admin_content">
        <AdminRoutes />
      </div>
    </div>
  );
}
