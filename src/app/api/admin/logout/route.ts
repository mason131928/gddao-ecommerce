import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // 清除 session cookie
    cookieStore.delete("admin_session");

    return NextResponse.json({
      success: true,
      message: "登出成功",
    });
  } catch (error) {
    console.error("登出錯誤:", error);
    return NextResponse.json(
      {
        success: false,
        error: "伺服器錯誤",
      },
      { status: 500 }
    );
  }
}
