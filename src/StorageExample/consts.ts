export type StorageTypes =
  | "sessionStorage.getItem"
  | "sessionStorage.setItem"
  | "localStorage.getItem"
  | "localStorage.setItem"
  | "localStorage.getSecuredItem"
  | "localStorage.setSecuredItem";

type RadioButton = { label: string; value: StorageTypes };

export const buttons: RadioButton[] = [
  { label: "Session Storage Get", value: "sessionStorage.getItem" },
  { label: "Session Storage Set", value: "sessionStorage.setItem" },
  { label: "Local Storage Get", value: "localStorage.getItem" },
  { label: "Local Storage Set", value: "localStorage.setItem" },
  { label: "Local Storage Secured Get", value: "localStorage.getSecuredItem" },
  { label: "Local Storage Secured Set", value: "localStorage.setSecuredItem" },
];
