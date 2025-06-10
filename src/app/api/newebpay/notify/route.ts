/**
 * 藍新金流後端通知處理
 * 接收藍新金流的POST通知並轉發到後端API
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("🔔 收到藍新金流後端通知");

  try {
    // 獲取藍新金流通知的表單資料
    const formData = await request.formData();

    // 轉換為標準物件
    const notifyData: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      notifyData[key] = value.toString();
    }

    console.log("📋 藍新金流通知資料：", notifyData);

    // 使用正確的後端API地址
    const backendUrl = "http://0.0.0.0:8000";
    const notifyUrl = `${backendUrl}/web/pay/notify_ecommerce`;

    console.log("🌐 轉發到後端URL:", notifyUrl);

    // 創建超時控制器
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超時

    try {
      // 轉發到後端API進行處理
      const response = await fetch(notifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Language: "cht",
        },
        body: new URLSearchParams(notifyData).toString(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId); // 清除超時計時器

      console.log("📡 後端響應狀態:", response.status);
      const responseText = await response.text();
      console.log("📄 後端響應內容:", responseText);

      if (response.ok) {
        console.log("✅ 通知處理成功");
        return new NextResponse("OK", { status: 200 });
      } else {
        console.error("❌ 後端處理失敗:", response.status, responseText);
        return new NextResponse("Error", { status: 500 });
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error("⚠️ 後端API調用失敗:", fetchError);
      return new NextResponse("Error", { status: 500 });
    }
  } catch (error) {
    console.error("💥 付款通知處理錯誤：", error);
    return new NextResponse("Error", { status: 500 });
  }
}
