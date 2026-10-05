import ProfileShell from "../ProfileShell";
import ChangePasswordForm from "./ChangePasswordForm";
import ProfileInfoForm from "./ProfileInfoForm";


export default function page() {
  return (
        <ProfileShell>
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your profile information and change your password
        </p>
      </div>
      <ProfileInfoForm />
      <ChangePasswordForm />
    </div>

        </ProfileShell>

  );
}