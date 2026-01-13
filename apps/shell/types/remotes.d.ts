declare module 'admin/AdminDashboard' {
  const AdminDashboard: React.ComponentType;
  export default AdminDashboard;
}

declare module 'admin/AdminLayout' {
  const AdminLayout: React.ComponentType<{ children: React.ReactNode }>;
  export default AdminLayout;
}

declare module 'customer/CustomerDashboard' {
  const CustomerDashboard: React.ComponentType;
  export default CustomerDashboard;
}

declare module 'customer/CustomerLayout' {
  const CustomerLayout: React.ComponentType<{ children: React.ReactNode }>;
  export default CustomerLayout;
}
