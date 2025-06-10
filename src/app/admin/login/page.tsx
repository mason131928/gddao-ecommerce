"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 登入成功，重導向到管理後台
        router.push("/admin");
      } else {
        setError(data.error || "登入失敗");
      }
    } catch {
      setError("網路錯誤，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 頂部橫幅 */}
      <div className="w-full bg-slate-700 text-white py-3 text-center shadow-sm">
        <p className="text-sm font-medium">
          生物多樣性契作 2.0 — 電商後台管理系統
        </p>
      </div>

      {/* 登入表單區域 */}
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)] px-4 py-4">
        <div className="w-full max-w-md">
          <Card className="mx-auto">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
                管理後台登入
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                請輸入您的帳號密碼以存取管理系統
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    帳號
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="請輸入帳號"
                    required
                    disabled={loading}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    密碼
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="請輸入密碼"
                    required
                    disabled={loading}
                    className="h-10"
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md border border-red-200">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-10 bg-slate-700 hover:bg-slate-800"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      登入中...
                    </div>
                  ) : (
                    "登入"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-slate-600 text-xs md:text-sm px-4">
            <p>
              © {new Date().getFullYear()} 孔雀魚數位科技股份有限公司.
              保留所有權利.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
