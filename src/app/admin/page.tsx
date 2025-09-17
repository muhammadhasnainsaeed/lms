export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <ul className="mt-4 space-y-2">
        <li>
          <a href="/admin/courses">Manage Courses</a>
        </li>
        <li>
          <a href="/admin/users">Manage Users</a>
        </li>
      </ul>
    </div>
  );
}
