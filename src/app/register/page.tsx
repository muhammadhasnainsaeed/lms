import RegisterForm from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import Link from "next/link";

export default function register() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>
            Enter your details below to register to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href={"/login"}>Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <RegisterForm />
      </Card>
    </div>
  );
}
