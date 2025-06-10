import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 管理員帳號密碼（實際專案中應該存在資料庫或環境變數）
const ADMIN_CREDENTIALS = {
  username: "Guppy",
  password: "$$Guppy94105597@@",
};

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // 驗證帳號密碼
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // 登入成功，設定 session cookie
      const cookieStore = await cookies();

      // 建立簡單的 session token（實際專案中應該使用更安全的方式）
      const sessionToken = Buffer.from(
        `${username}:${Date.now()}:admin`
      ).toString("base64");

      // 設定 cookie（24小時過期）
      cookieStore.set("admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24小時
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "登入成功",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "帳號或密碼錯誤",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("登入錯誤:", error);
    return NextResponse.json(
      {
        success: false,
        error: "伺服器錯誤",
      },
      { status: 500 }
    );
  }
}
