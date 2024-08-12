import { signOut, useSession } from "next-auth/react";

export function LogOff() {
  sessionStorage.removeItem("roll");
  sessionStorage.removeItem("login");
  signOut();
}

