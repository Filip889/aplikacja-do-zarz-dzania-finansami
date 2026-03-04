import { useEffect, useState } from "react";
import axios from "../api/axios";
import ProfileCard from "../components/settings/ProfileCard";
import ChangeEmailForm from "../components/settings/ChangeEmailForm";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";
import DangerZone from "../components/settings/DangerZone";

export default function Settings() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/user/me").then((res) => setUser(res.data));
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Ustawienia</h1>

      <ProfileCard user={user} />
      <ChangeEmailForm />
      <ChangePasswordForm />
      <DangerZone />
    </div>
  );
}
