import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href={"/register"}>Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
}
