export default function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow">
      <h2 className="text-xl font-bold mb-4">Profil</h2>

      <p className="text-gray-700">
        <span className="font-semibold">Email:</span> {user.email}
      </p>

      <p className="text-gray-500 text-sm mt-2">
        Konto utworzone: {new Date(user.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}
