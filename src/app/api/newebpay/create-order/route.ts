/**
 * 電商訂單創建API代理路由
 * 轉發到後端API處理訂單創建和藍新金流整合
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("🚀 電商訂單創建API被調用:", request.url);
  console.log("🔍 請求來源:", request.headers.get("referer"));

  try {
    const body = await request.json();
    console.log("📊 請求數據:", body);

    // 轉發請求到後端API
    const backendUrl = "https://api.gddao.com";
    const apiUrl = `${backendUrl}/api/ecommerce/create-order`;
    console.log("🌐 轉發到後端URL:", apiUrl);

    // 創建超時控制器
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超時

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Language: "cht",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId); // 清除超時計時器

      console.log("📡 後端響應狀態:", response.status);
      console.log(
        "📄 後端響應頭:",
        Object.fromEntries(response.headers.entries())
      );

      const data = await response.json();
      console.log("📋 後端響應數據:", data);

      // 返回響應
      return NextResponse.json(data, {
        status: response.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Language",
        },
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error("⚠️ 後端API調用失敗:", fetchError);

      return NextResponse.json(
        {
          success: false,
          error: "後端服務暫時不可用",
          details:
            fetchError instanceof Error
              ? fetchError.message
              : String(fetchError),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ 訂單創建API代理錯誤:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        success: false,
        error: "服務器錯誤",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  console.log("🔧 處理訂單創建OPTIONS預檢請求");
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Language",
    },
  });
}
