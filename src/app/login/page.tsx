
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    // Simulate API call for login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Login form submitted:", data);
    // This is a placeholder. In a real app, you'd handle auth state.
    if (data.email === "test@example.com" && data.password === "password") {
      toast({
        title: "Login Successful!",
        description: "Welcome back to Nedzo AI.",
      });
      // Redirect to dashboard
      // router.push('/dashboard'); 
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30 py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mb-4">
            <PhoneCall className="h-12 w-12 text-primary mx-auto" />
          </Link>
          <CardTitle className="text-3xl font-bold">Welcome Back to Nedzo AI</CardTitle>
          <CardDescription>
            Sign in to access your AI Voice Agents and dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" prefetch={false} className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" {...register("password")} placeholder="••••••••" />
              {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm">
           <p className="mt-4 text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
