'use client';
import ProtectedRoute from '@/components/ProtectedRoute';

const AdminPage = () => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
