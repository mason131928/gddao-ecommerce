import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ResultPageProps {
  searchParams: Promise<{
    status?: string;
    orderNo?: string;
    message?: string;
  }>;
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const { status, orderNo, message } = await searchParams;

  const isSuccess = status === "success";
  const isError = status === "error";
  const isFailure = status === "failure";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* 頂部橫幅 */}
      <div className="w-full bg-slate-700 text-white py-3 text-center shadow-sm">
        <p className="text-sm font-medium">
          生物多樣性契作 2.0 — 從餐桌到田野的生態革命
        </p>
      </div>

      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card className="border-t-4 border-t-slate-600 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-slate-800">
              {isSuccess && "付款成功"}
              {isError && "處理錯誤"}
              {isFailure && "付款失敗"}
              {!status && "付款結果"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSuccess && "您的米禮盒預訂已完成付款處理"}
              {isError && "處理您的付款時發生錯誤"}
              {isFailure && "您的付款未能完成"}
              {!status && "查看您的付款結果"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isSuccess && orderNo && (
              <div className="bg-slate-100 p-4 rounded-md border border-slate-200 shadow-sm">
                <p className="text-slate-800">訂單編號：{orderNo}</p>
                <p className="text-slate-700 mt-2">
                  感謝您支持生物多樣性契作計畫！您的訂單已成功付款，我們會在您選擇的配送時間前將生態米禮盒送達。
                </p>
              </div>
            )}

            {(isError || isFailure) && (
              <div className="bg-red-50 p-4 rounded-md border border-red-200 shadow-sm">
                <p className="text-red-800">
                  錯誤訊息：{message || "未知錯誤"}
                </p>
                <p className="text-red-700 mt-2">
                  付款處理未成功，請稍後再試或聯繫我們的客服人員尋求協助。
                </p>
              </div>
            )}

            {!status && (
              <div className="bg-amber-50 p-4 rounded-md border border-amber-200 shadow-sm">
                <p className="text-amber-800">無法確認付款狀態</p>
                <p className="text-amber-700 mt-2">
                  如果您已完成付款但看到此訊息，請聯繫客服人員確認訂單狀態。
                </p>
              </div>
            )}

            {isSuccess && (
              <div className="mt-4">
                <h3 className="font-semibold text-slate-800 mb-2">
                  您的支持將幫助：
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-600 mr-2 mt-0.5 shrink-0"
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
                    <span>減少農藥使用，重建生物棲地</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-600 mr-2 mt-0.5 shrink-0"
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
                    <span>吸引猛禽與蛙類回歸農田生態系</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-600 mr-2 mt-0.5 shrink-0"
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
                    <span>推動永續農業發展，保護台灣土地</span>
                  </li>
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Link href="/" passHref className="w-full">
              <Button className="w-full bg-slate-700 hover:bg-slate-800 text-white shadow-sm">
                回到首頁
              </Button>
            </Link>

            {(isError || isFailure) && (
              <p className="text-sm text-center text-slate-500">
                如有任何問題，請聯繫我們：
                <a
                  href="mailto:service@gddao.com"
                  className="text-slate-700 hover:underline"
                >
                  service@gddao.com
                </a>
              </p>
            )}

            {isSuccess && (
              <p className="text-sm text-center text-slate-600">
                你送出的不只是米，更是一塊恢復生命力的台灣田地。
              </p>
            )}
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-slate-600 text-sm">
          <p>
            © {new Date().getFullYear()} 孔雀魚數位科技股份有限公司.
            保留所有權利.
          </p>
        </div>
      </div>
    </main>
  );
}
