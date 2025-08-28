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
import z from "zod";
import { CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const fields = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Your name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "m@example.com",
  },
  {
    name: "password",
    label: "Create Password",
    type: "password",
    placeholder: "••••••••",
  },
];
const FormSchema = z.object({
  name: z.string().nonempty({ error: "Name is required" }),
  email: z
    .email({ error: "Enter a valid email" })
    .nonempty({ error: "Email is required" }),
  password: z
    .string()
    .nonempty({ error: "Password is required" })
    .regex(/[A-Z]/, { error: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { error: "Must contain at least one lowercase letter" })
    .min(6, { error: "Password must be at least 6 characters long" }),
});

export default function RegisterForm() {
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmit(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(JSON.stringify(result, null, 2));
        toast.success(result?.message);
        router.push("/login");
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
          <div className="flex flex-col gap-5">
            {fields.map((f) => (
              <FormField
                key={f.name}
                control={form.control}
                name={f.name as "email" | "password" | "name"}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>{f.label}</FormLabel>
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
            {isSubmit ? "Please wait" : "Register"}
          </Button>
          <Button variant="outline" className="w-full">
            Register with Google
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
