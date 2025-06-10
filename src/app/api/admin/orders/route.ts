/**
 * 後台訂單管理 API
 * 獲取電商訂單列表和統計資料
 */

import { NextResponse } from "next/server";

export async function GET() {
  console.log("🔍 後台訂單API被調用");

  try {
    // 使用正確的後端API地址
    const backendUrl = "http://0.0.0.0:8000";
    const apiUrl = `${backendUrl}/api/ecommerce/orders`;

    console.log("🌐 請求後端URL:", apiUrl);

    // 創建超時控制器
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超時

    try {
      // 請求後端API獲取訂單資料
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Language: "cht",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId); // 清除超時計時器

      console.log("📡 後端響應狀態:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("📋 後端響應數據:", data);

        return NextResponse.json(data, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Language",
          },
        });
      } else {
        const errorText = await response.text();
        console.error("❌ 後端API錯誤:", response.status, errorText);

        // 返回空資料而不是錯誤，讓前端可以正常顯示
        return NextResponse.json(
          {
            orders: [],
            stats: { total: 0, paid: 0, pending: 0, failed: 0 },
            message: "暫無資料或後端服務不可用",
          },
          { status: 200 }
        );
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error("⚠️ 後端API調用失敗:", fetchError);

      // 返回空資料而不是錯誤
      return NextResponse.json(
        {
          orders: [],
          stats: { total: 0, paid: 0, pending: 0, failed: 0 },
          message: "後端服務暫時不可用",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("💥 訂單API處理錯誤：", error);
    const errorMessage = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        orders: [],
        stats: { total: 0, paid: 0, pending: 0, failed: 0 },
        error: "服務器錯誤",
        details: errorMessage,
      },
      { status: 200 } // 仍然返回 200，讓前端可以處理
    );
  }
}

export async function OPTIONS() {
  console.log("🔧 處理訂單API OPTIONS預檢請求");
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Language",
    },
  });
}
