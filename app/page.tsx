"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { useAuthContext } from "@/lib/AuthContextProvider";
import { useRouter } from "next/navigation";
import { HOST } from "@/lib/url";

const formSchema = z.object({
  email: z.string().email({ message: "邮箱格式不对哦😯" }),
});

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function LandingPage() {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home/articles");
    }
  }, [isAuthenticated, router]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    try {
      const response = await fetch(`http://${HOST}/api/auth/login`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        toast({
          variant: "destructive",
          description: `${json.msg}`,
        });
      }
      if (response.ok) {
        toast({ description: `${json.msg}` });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: `出错啦！错误信息：${error}`,
      });
    }
  }
  return (
    <main>
      <div className="h-screen flex flex-col justify-center items-center space-y-8">
        <h1 className="text-7xl font-bold">觉意阅读</h1>
        <p className="pb-16">一个简短但是有力的介绍文本</p>
        <Sheet>
          <SheetTrigger>这里登录！</SheetTrigger>
          <SheetContent side="top">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="在这里输入您的邮箱📮地址 "
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        点击登录后，请在邮箱中查看登录链接。点击链接后自动跳转～
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">登录</Button>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="">
        <h2>广告</h2>
        <p>landing, register, login</p>
      </div>
    </main>
  );
}
