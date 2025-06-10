import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const isAuthenticated = await checkAdminAuth();

    if (isAuthenticated) {
      return NextResponse.json({
        success: true,
        message: "已驗證",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "未授權",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("權限檢查錯誤:", error);
    return NextResponse.json(
      {
        success: false,
        error: "伺服器錯誤",
      },
      { status: 500 }
    );
  }
}
