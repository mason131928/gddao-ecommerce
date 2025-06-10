import { cookies } from "next/headers";

export async function checkAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session");

    if (!sessionToken) {
      return false;
    }

    // 解析 session token
    try {
      const decoded = Buffer.from(sessionToken.value, "base64").toString();
      const [username, timestamp, role] = decoded.split(":");

      // 檢查是否為管理員且 session 未過期（24小時）
      const isValid =
        username === "Guppy" &&
        role === "admin" &&
        Date.now() - parseInt(timestamp) < 24 * 60 * 60 * 1000;

      return isValid;
    } catch {
      return false;
    }
  } catch {
    return false;
  }
}

export async function requireAdminAuth() {
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    throw new Error("未授權存取");
  }

  return true;
}
