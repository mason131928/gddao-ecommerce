"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Order {
  id: number;
  order_no: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_name: string;
  total_amount: number;
  payment_status: number;
  order_status: number;
  payment_time: string | null;
  create_time: string;
}

const paymentStatusMap = {
  0: { label: "待付款", variant: "secondary" as const },
  1: { label: "已付款", variant: "default" as const },
  2: { label: "付款失敗", variant: "destructive" as const },
  3: { label: "已退款", variant: "outline" as const },
};

const orderStatusMap = {
  0: { label: "待處理", variant: "secondary" as const },
  1: { label: "處理中", variant: "default" as const },
  2: { label: "已出貨", variant: "default" as const },
  3: { label: "已完成", variant: "default" as const },
  4: { label: "已取消", variant: "destructive" as const },
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    failed: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
        setStats(data.stats || { total: 0, paid: 0, pending: 0, failed: 0 });
      }
    } catch (error) {
      console.error("獲取訂單失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("zh-TW");
  };

  const formatAmount = (amount: number) => {
    return `NT$ ${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto mb-4"></div>
          <p className="text-slate-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 頂部橫幅 */}
      <div className="w-full bg-slate-700 text-white py-3 text-center shadow-sm">
        <p className="text-sm font-medium">
          生物多樣性契作 2.0 — 電商後台管理系統
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">訂單管理</h1>
          <p className="text-slate-600">管理生態米禮盒的訂單和付款狀態</p>
        </div>

        {/* 統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                總訂單數
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {stats.total}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                已付款
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.paid}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                待付款
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {stats.pending}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                付款失敗
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.failed}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 訂單列表 */}
        <Card>
          <CardHeader>
            <CardTitle>訂單列表</CardTitle>
            <CardDescription>所有生態米禮盒的訂單記錄</CardDescription>
            <div className="flex justify-end">
              <Button onClick={fetchOrders} variant="outline" size="sm">
                重新整理
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>訂單編號</TableHead>
                    <TableHead>客戶資訊</TableHead>
                    <TableHead>商品</TableHead>
                    <TableHead>金額</TableHead>
                    <TableHead>付款狀態</TableHead>
                    <TableHead>訂單狀態</TableHead>
                    <TableHead>付款時間</TableHead>
                    <TableHead>建立時間</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="text-slate-500">
                          <p className="text-lg mb-2">尚無訂單資料</p>
                          <p className="text-sm">
                            當有客戶下單時，訂單會顯示在這裡
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">
                          {order.order_no}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {order.customer_name}
                            </div>
                            <div className="text-sm text-slate-500">
                              {order.customer_email}
                            </div>
                            <div className="text-sm text-slate-500">
                              {order.customer_phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{order.product_name}</TableCell>
                        <TableCell className="font-medium">
                          {formatAmount(order.total_amount)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              paymentStatusMap[
                                order.payment_status as keyof typeof paymentStatusMap
                              ]?.variant
                            }
                          >
                            {
                              paymentStatusMap[
                                order.payment_status as keyof typeof paymentStatusMap
                              ]?.label
                            }
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              orderStatusMap[
                                order.order_status as keyof typeof orderStatusMap
                              ]?.variant
                            }
                          >
                            {
                              orderStatusMap[
                                order.order_status as keyof typeof orderStatusMap
                              ]?.label
                            }
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {order.payment_time
                            ? formatDate(order.payment_time)
                            : "-"}
                        </TableCell>
                        <TableCell>{formatDate(order.create_time)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-slate-600 text-sm">
          <p>
            © {new Date().getFullYear()} 孔雀魚數位科技股份有限公司.
            保留所有權利.
          </p>
        </div>
      </div>
    </div>
  );
}
