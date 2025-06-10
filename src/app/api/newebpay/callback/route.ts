/**
 * 藍新金流付款回調處理
 * 接收藍新金流的POST回調並轉發到後端API
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("🔔 收到藍新金流回調");

  try {
    // 獲取藍新金流回調的表單資料
    const formData = await request.formData();

    // 轉換為標準物件
    const callbackData: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      callbackData[key] = value.toString();
    }

    console.log("📋 藍新金流回調資料：", callbackData);

    // 使用正確的後端API地址
    const backendUrl = "https://api.gddao.com";
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
        body: new URLSearchParams(callbackData).toString(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId); // 清除超時計時器

      console.log("📡 後端響應狀態:", response.status);
      const responseText = await response.text();
      console.log("📄 後端響應內容:", responseText);

      // 準備成功頁面URL
      const successUrl = new URL("/payment/result", request.url);

      if (response.ok) {
        console.log("✅ 回調處理成功");

        // 添加成功參數
        if (callbackData.Status === "SUCCESS" || callbackData.Status === "1") {
          successUrl.searchParams.set("status", "success");
          successUrl.searchParams.set(
            "orderNo",
            callbackData.MerchantOrderNo || ""
          );
          successUrl.searchParams.set("message", "付款成功");
        } else {
          successUrl.searchParams.set("status", "failure");
          successUrl.searchParams.set("message", "付款失敗");
        }

        return NextResponse.redirect(successUrl);
      } else {
        console.error("❌ 後端處理失敗:", response.status, responseText);

        // 後端處理失敗但仍然導向結果頁面
        successUrl.searchParams.set("status", "error");
        successUrl.searchParams.set("message", "付款資料處理中，請稍後確認");
        return NextResponse.redirect(successUrl);
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error("⚠️ 後端API調用失敗:", fetchError);

      // API調用失敗，但仍導向結果頁面
      const successUrl = new URL("/payment/result", request.url);
      successUrl.searchParams.set("status", "error");
      successUrl.searchParams.set("message", "系統處理中，請稍後確認付款狀態");
      return NextResponse.redirect(successUrl);
    }
  } catch (error) {
    console.error("💥 付款回調處理錯誤：", error);

    // 錯誤處理，但仍導向結果頁面
    const successUrl = new URL("/payment/result", request.url);
    successUrl.searchParams.set("status", "error");
    successUrl.searchParams.set(
      "message",
      "系統處理中，請聯繫客服確認付款狀態"
    );
    return NextResponse.redirect(successUrl);
  }
}

// 處理GET請求（測試用）
export async function GET(request: NextRequest) {
  console.log("🔍 收到付款回調GET請求（測試）");
  return NextResponse.json({
    message: "付款回調端點正常",
    url: request.url,
    timestamp: new Date().toISOString(),
  });
}
