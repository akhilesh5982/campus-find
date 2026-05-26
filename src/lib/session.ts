import { cookies } from "next/headers";
import { verifyToken, type JWTPayload } from "./auth";

// Yeh function check karega ki user logged in hai ya nahi
export function getAuthUser(): JWTPayload | null {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  
  if (!token) return null;
  
  return verifyToken(token);
}