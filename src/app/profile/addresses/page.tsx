import ProfileShell from "../ProfileShell";
import AddAddressButton from "./AddAddressButton";
import { getAddresses } from "./address.action";
import AddressCard from "./AddressCard";
import EmptyAddresses from "./EmptyAddresses";


export default async function page() {
  const addresses = await getAddresses();

  return (
        <ProfileShell>

             <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your saved delivery addresses
          </p>
        </div>
        <AddAddressButton />
      </div>

    {addresses.length === 0 ? (
  <EmptyAddresses />
) : (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {addresses.map((a) => (
      <AddressCard key={a._id} address={a} />
    ))}
  </div>
)}
    </div>
        </ProfileShell>
   
  );
}