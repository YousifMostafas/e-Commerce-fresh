export type AddressInput = {
  name: string;
  details: string;
  phone: string;
  city: string;
};

export type Address = AddressInput & { _id: string };

export type ActionResult = { ok: boolean; message: string };