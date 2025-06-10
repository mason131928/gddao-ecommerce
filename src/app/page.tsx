"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import Image from "next/image";

const products = [
  {
    id: "2-pack",
    name: "二入組合禮盒",
    description: "白米＋紅糙米（600g／包），抽屜式包裝",
    price: 5000,
    quantity: 10,
    unitPrice: 500,
    image: "/rice-2pack.jpg",
  },
  {
    id: "3-pack",
    name: "三入組合禮盒",
    description: "白米＋糙米＋紅糙米（600g／包），抽屜式包裝",
    price: 6000,
    quantity: 8,
    unitPrice: 750,
    image: "/rice-3pack.jpg",
  },
  {
    id: "company",
    name: "企業契作永續版",
    description: "客製企業 LOGO 禮盒包裝與故事頁面",
    price: 300000,
    quantity: 1,
    unitPrice: 300000,
    image: "/rice-company.jpg",
  },
];

/**
 * 生態米禮盒預購頁面
 */
export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [deliveryTime, setDeliveryTime] = useState<"中秋節前" | "春節前">(
    "中秋節前"
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* 頂部橫幅 */}
      <div className="w-full bg-slate-700 text-white py-3 text-center shadow-sm">
        <p className="text-sm font-medium">
          生物多樣性契作 2.0 — 從餐桌到田野的生態革命
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            送禮，也能守護台灣生態
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            每年你本來就要送禮，這次的中秋與春節，讓禮盒更有意義。
            支持友善耕作，協助立起猛禽棲架，重建台灣低地平原的生態網絡。
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            {/* 故事說明區塊 - 簡化版本 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {/* 標題區塊 */}
              <div className="bg-slate-700 py-6 px-8 text-white">
                <h2 className="text-2xl font-bold tracking-tight flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M21 12c0-3.5-2.5-6.5-6-7.25v15.5c3.5-.75 6-3.75 6-7.25z"></path>
                    <path d="M3 12c0 3.5 2.75 6.5 6 7.25v-15.5c-3.25.75-6 3.75-6 7.25 M14 6c-.25 2.5.75 4 1.5 6 .25.5.25 1.5.25 2"></path>
                  </svg>
                  黑翅鳶回來了，田野響起蛙鳴
                </h2>
                <p className="mt-1 text-slate-300">
                  那是我們停止撒藥後，土地發出的回應
                </p>
              </div>

              {/* 內容區塊 */}
              <div className="p-8">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    你手上那一盒米禮盒，不只是糧食，是一塊土地正在恢復生命力的
                    <span className="font-semibold text-slate-700">證明</span>
                    。攝影機在田邊記錄下猛禽補鼠、青蛙返巢，這些曾被農藥驅離的生物，現在正一點一滴回來了。
                  </p>

                  <div className="flex items-start mb-6">
                    <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate-600"
                      >
                        <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"></path>
                      </svg>
                    </div>
                    <p className="text-slate-700">
                      我們在
                      <span className="font-semibold text-slate-700">
                        太巴塱的 200 公頃土地
                      </span>
                      上推動「生物多樣性契作
                      2.0」，這是一場農民與生物的共生革命。沒有劇毒農藥、沒有過量肥料，靠棲架引來老鷹補鼠、種草毯吸引益蟲控蟲，重建台灣低地平原的生態網絡。
                    </p>
                  </div>

                  <div className="bg-slate-100 border-l-4 border-slate-500 p-4 rounded-r-lg">
                    <p className="font-bold text-lg text-slate-700">
                      但這一切，需要你來支持。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 商品選擇區塊 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800">
                選擇您的支持方案
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedProduct.id === product.id
                        ? "ring-2 ring-slate-500 bg-slate-50"
                        : "bg-white"
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="aspect-[4/3] relative bg-slate-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/400x300/f5f5f4/78716c?text=生態米禮盒";
                        }}
                      />
                    </div>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">
                        {product.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 text-sm">
                      <p>{product.description}</p>
                      <p className="mt-2 font-medium text-slate-700">
                        NT$ {product.price.toLocaleString()}
                      </p>
                      {product.quantity > 1 && (
                        <p className="text-xs text-slate-500">
                          {product.quantity} 組 | 平均每盒 NT${" "}
                          {product.unitPrice}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 配送時間選擇 */}
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800">
                    配送時間
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <button
                      className={`px-4 py-2 rounded-md border transition-colors ${
                        deliveryTime === "中秋節前"
                          ? "bg-slate-100 border-slate-500 text-slate-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                      onClick={() => setDeliveryTime("中秋節前")}
                    >
                      中秋節前配送
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md border transition-colors ${
                        deliveryTime === "春節前"
                          ? "bg-slate-100 border-slate-500 text-slate-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                      onClick={() => setDeliveryTime("春節前")}
                    >
                      春節前配送
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 右側結帳區塊 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">訂單摘要</CardTitle>
                  <CardDescription>您的預購詳情</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-lg text-slate-800">
                      {selectedProduct.name}
                    </span>
                    <span className="font-bold text-lg text-slate-700">
                      NT$ {selectedProduct.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-700">
                    {selectedProduct.description}
                  </p>

                  <div className="pt-2">
                    <h4 className="font-semibold mb-2 text-slate-800">
                      您的支持將會：
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.id !== "company" ? (
                        <>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-slate-600 mr-2 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-slate-700">
                              支持友善耕作的農夫減少農藥使用
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-slate-600 mr-2 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-slate-700">
                              協助立起猛禽棲架，取代老鼠藥
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-slate-600 mr-2 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-slate-700">
                              獲得印有珍貴生態紀錄的米禮盒
                            </span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-slate-600 mr-2 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-slate-700">
                              冠名猛禽棲架或生態觀測盆
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-slate-600 mr-2 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-slate-700">
                              客製企業 LOGO 禮盒包裝與故事頁面
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-slate-600 mr-2 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-slate-700">
                              取得生態影像與數據用於永續報告書
                            </span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-slate-600">{deliveryTime}配送</p>
                  </div>

                  <Separator className="bg-slate-200" />

                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-slate-800">總計</span>
                    <span className="text-slate-700">
                      NT$ {selectedProduct.price.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <PaymentForm
                    productName={`生態米禮盒 - ${selectedProduct.name} (${deliveryTime}配送)`}
                    productPrice={selectedProduct.price}
                  />
                  <p className="text-xs text-slate-600 text-center">
                    你送出的，不只是米，更是一塊恢復生命力的台灣田地。
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* 頁尾資訊 */}
        <div className="mt-16 text-center text-slate-600 text-sm">
          <p>
            © {new Date().getFullYear()} 孔雀魚數位科技股份有限公司.
            保留所有權利.
          </p>
          <p className="mt-2">如有任何問題，請聯繫我們的客戶服務團隊</p>
        </div>
      </div>

      {/* 顯示提示訊息 */}
      <Toaster />
    </main>
  );
}
