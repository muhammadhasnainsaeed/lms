"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginSchema, type LoginInput } from "@/utils/validations/auth";
import { type LoginResponse } from "@/types/user";

const fields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "m@example.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
];

export default function LoginForm() {
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInput) {
    setIsSubmit(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: LoginResponse = await response.json();
      if (response.ok) {
        console.log(JSON.stringify(result, null, 2));
        router.push(result.redirect);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong");
    } finally {
      setIsSubmit(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CardContent>
          <div className="flex flex-col gap-6">
            {fields.map((f) => (
              <FormField
                key={f.name}
                control={form.control}
                name={f.name as "email" | "password"}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <FormLabel>{f.label}</FormLabel>
                        {f.type === "password" && (
                          <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        )}
                      </div>
                      <FormControl>
                        <Input
                          type={f.type}
                          placeholder={f.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            <Loader2Icon className={`animate-spin ${!isSubmit && "hidden"}`} />
            {isSubmit ? "Please wait" : "Login"}
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
