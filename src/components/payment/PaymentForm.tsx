"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

// 表單驗證 Schema
const formSchema = z.object({
  name: z.string().min(2, "請輸入完整姓名"),
  email: z.string().email("請輸入有效的電子郵件"),
  phone: z.string().regex(/^09\d{8}$/, "請輸入有效的手機號碼"),
  address: z.string().min(5, "請輸入完整的配送地址"),
  amount: z.number().min(1, "金額必須大於 0"),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PaymentFormProps {
  productPrice: number;
  productName: string;
}

export function PaymentForm({ productPrice, productName }: PaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      amount: productPrice,
      note: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newebpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          product_name: productName,
        }),
      });

      const data = await response.json();

      if (data.code === 200 && data.data?.payment_url) {
        // 直接跳轉到後端產生的付款連結
        window.location.href = data.data.payment_url;
      } else {
        throw new Error(data.message || "建立訂單失敗");
      }
    } catch (error) {
      console.error("付款處理錯誤:", error);
      toast.error(
        `付款處理錯誤: ${error instanceof Error ? error.message : "未知錯誤"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">姓名</FormLabel>
              <FormControl>
                <Input
                  placeholder="請輸入您的姓名"
                  {...field}
                  className="border-slate-200 focus-visible:ring-slate-300 focus-visible:border-slate-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">電子郵件</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@example.com"
                  {...field}
                  className="border-slate-200 focus-visible:ring-slate-300 focus-visible:border-slate-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">手機號碼</FormLabel>
              <FormControl>
                <Input
                  placeholder="0912345678"
                  {...field}
                  className="border-slate-200 focus-visible:ring-slate-300 focus-visible:border-slate-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">配送地址</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="請填寫完整的配送地址"
                  className="resize-none border-slate-200 focus-visible:ring-slate-300 focus-visible:border-slate-400"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">備註（選填）</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="其他備註事項"
                  className="resize-none border-slate-200 focus-visible:ring-slate-300 focus-visible:border-slate-400"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-slate-700 hover:bg-slate-800 text-white shadow-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? "處理中..." : "前往付款"}
        </Button>
      </form>
    </Form>
  );
}
