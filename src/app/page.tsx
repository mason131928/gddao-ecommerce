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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const product = {
  id: "2-pack",
  name: "生態禮盒",
  description: "白米＋紅糙米（600g／盒），抽屜式包裝，(一箱10盒)",
  unitPrice: 5000,
  image: "/rice-2pack.jpg",
};

type DeliveryOption = "mid-autumn" | "spring" | "both";

interface DeliverySelection {
  midAutumn: number;
  spring: number;
}

/**
 * 生態米禮盒訂購頁面
 */
export default function Home() {
  const [deliveryOption, setDeliveryOption] =
    useState<DeliveryOption>("mid-autumn");
  const [quantities, setQuantities] = useState<DeliverySelection>({
    midAutumn: 1,
    spring: 0,
  });

  // 計算總金額
  const getTotalAmount = () => {
    let total = 0;
    if (deliveryOption === "mid-autumn") {
      total = quantities.midAutumn * product.unitPrice;
    } else if (deliveryOption === "spring") {
      total = quantities.spring * product.unitPrice;
    } else if (deliveryOption === "both") {
      total = (quantities.midAutumn + quantities.spring) * product.unitPrice;
    }
    return total;
  };

  // 獲取商品描述
  const getProductDescription = () => {
    const descriptions = [];
    if (deliveryOption === "mid-autumn" || deliveryOption === "both") {
      if (quantities.midAutumn > 0) {
        descriptions.push(`中秋節前配送 ${quantities.midAutumn} 箱`);
      }
    }
    if (deliveryOption === "spring" || deliveryOption === "both") {
      if (quantities.spring > 0) {
        descriptions.push(`春節前配送 ${quantities.spring} 箱`);
      }
    }
    return `${product.name} - ${descriptions.join("、")}`;
  };

  // 處理配送選項變更
  const handleDeliveryOptionChange = (option: DeliveryOption) => {
    setDeliveryOption(option);
    // 重置數量
    if (option === "mid-autumn") {
      setQuantities({ midAutumn: 1, spring: 0 });
    } else if (option === "spring") {
      setQuantities({ midAutumn: 0, spring: 1 });
    } else {
      setQuantities({ midAutumn: 1, spring: 1 });
    }
  };

  // 處理數量變更
  const handleQuantityChange = (
    type: "midAutumn" | "spring",
    value: number
  ) => {
    const newValue = Math.max(0, value);
    setQuantities((prev) => ({
      ...prev,
      [type]: newValue,
    }));
  };

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
            {/* 故事說明區塊 */}
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

            {/* 商品展示區塊 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800">
                生態米禮盒訂購
              </h2>

              {/* 商品卡片 */}
              <Card className="bg-white border-slate-200">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="aspect-[4/3] relative bg-slate-100 rounded-lg overflow-hidden">
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
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {product.name}
                      </h3>
                      <p className="text-slate-600 mt-2">
                        {product.description}
                      </p>
                      <p className="text-lg font-semibold text-slate-700 mt-3">
                        NT$ {product.unitPrice.toLocaleString()} / 箱
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">
                        您的支持將會：
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0"
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
                            className="h-5 w-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0"
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
                            className="h-5 w-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0"
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
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 配送時間選擇 */}
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800">
                    選擇配送時間
                  </CardTitle>
                  <CardDescription>
                    請選擇您希望的配送時間，可以選擇單一時間或兩個時間都要
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button
                      variant={
                        deliveryOption === "mid-autumn" ? "default" : "outline"
                      }
                      className={`h-auto p-4 ${
                        deliveryOption === "mid-autumn"
                          ? "bg-slate-700 hover:bg-slate-800"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                      onClick={() => handleDeliveryOptionChange("mid-autumn")}
                    >
                      <div className="text-center">
                        <div className="font-semibold">中秋節前</div>
                        <div className="text-sm opacity-80">單一配送</div>
                      </div>
                    </Button>

                    <Button
                      variant={
                        deliveryOption === "spring" ? "default" : "outline"
                      }
                      className={`h-auto p-4 ${
                        deliveryOption === "spring"
                          ? "bg-slate-700 hover:bg-slate-800"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                      onClick={() => handleDeliveryOptionChange("spring")}
                    >
                      <div className="text-center">
                        <div className="font-semibold">春節前</div>
                        <div className="text-sm opacity-80">單一配送</div>
                      </div>
                    </Button>

                    <Button
                      variant={
                        deliveryOption === "both" ? "default" : "outline"
                      }
                      className={`h-auto p-4 ${
                        deliveryOption === "both"
                          ? "bg-slate-700 hover:bg-slate-800"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                      onClick={() => handleDeliveryOptionChange("both")}
                    >
                      <div className="text-center">
                        <div className="font-semibold">兩者都要</div>
                        <div className="text-sm opacity-80">分批配送</div>
                      </div>
                    </Button>
                  </div>

                  {/* 數量選擇 */}
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <h4 className="font-semibold text-slate-800">選擇數量</h4>

                    {(deliveryOption === "mid-autumn" ||
                      deliveryOption === "both") && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="midAutumn" className="text-slate-700">
                          中秋節前配送
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                "midAutumn",
                                quantities.midAutumn - 1
                              )
                            }
                            disabled={
                              quantities.midAutumn <=
                              (deliveryOption === "mid-autumn" ? 1 : 0)
                            }
                          >
                            -
                          </Button>
                          <Input
                            id="midAutumn"
                            type="number"
                            min={deliveryOption === "mid-autumn" ? 1 : 0}
                            value={quantities.midAutumn}
                            onChange={(e) =>
                              handleQuantityChange(
                                "midAutumn",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-20 text-center"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                "midAutumn",
                                quantities.midAutumn + 1
                              )
                            }
                          >
                            +
                          </Button>
                          <span className="text-slate-600 ml-2">箱</span>
                        </div>
                      </div>
                    )}

                    {(deliveryOption === "spring" ||
                      deliveryOption === "both") && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="spring" className="text-slate-700">
                          春節前配送
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                "spring",
                                quantities.spring - 1
                              )
                            }
                            disabled={
                              quantities.spring <=
                              (deliveryOption === "spring" ? 1 : 0)
                            }
                          >
                            -
                          </Button>
                          <Input
                            id="spring"
                            type="number"
                            min={deliveryOption === "spring" ? 1 : 0}
                            value={quantities.spring}
                            onChange={(e) =>
                              handleQuantityChange(
                                "spring",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-20 text-center"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                "spring",
                                quantities.spring + 1
                              )
                            }
                          >
                            +
                          </Button>
                          <span className="text-slate-600 ml-2">箱</span>
                        </div>
                      </div>
                    )}
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
                  <CardDescription>您的訂購詳情</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800">
                      {product.name}
                    </h4>

                    {/* 顯示配送詳情 */}
                    {(deliveryOption === "mid-autumn" ||
                      deliveryOption === "both") &&
                      quantities.midAutumn > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            中秋節前配送 × {quantities.midAutumn}
                          </span>
                          <span className="text-slate-700">
                            NT${" "}
                            {(
                              quantities.midAutumn * product.unitPrice
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}

                    {(deliveryOption === "spring" ||
                      deliveryOption === "both") &&
                      quantities.spring > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            春節前配送 × {quantities.spring}
                          </span>
                          <span className="text-slate-700">
                            NT${" "}
                            {(
                              quantities.spring * product.unitPrice
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}
                  </div>

                  <Separator className="bg-slate-200" />

                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-slate-800">總計</span>
                    <span className="text-slate-700">
                      NT$ {getTotalAmount().toLocaleString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  {getTotalAmount() > 0 ? (
                    <PaymentForm
                      productName={getProductDescription()}
                      productPrice={getTotalAmount()}
                    />
                  ) : (
                    <div className="w-full p-4 text-center text-slate-500 bg-slate-50 rounded-md">
                      請選擇數量
                    </div>
                  )}
                  <p className="text-xs text-slate-600 text-center">
                    你送出的不只是米，更是一塊恢復生命力的台灣田地。
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
