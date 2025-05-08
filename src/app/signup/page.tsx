
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall } from "lucide-react";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  plan: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const planFromQuery = searchParams.get('plan');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      plan: planFromQuery || "business", // Default to business if no plan
    }
  });

 useEffect(() => {
    if (planFromQuery) {
      setValue('plan', planFromQuery);
    }
  }, [planFromQuery, setValue]);


  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    // Simulate API call for signup
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Signup form submitted:", { email: data.email, plan: data.plan });
    toast({
      title: "Account Created!",
      description: `Welcome to Nedzo AI! You're signed up for the ${data.plan || 'default'} plan.`,
    });
    reset();
    // Redirect to dashboard or login, or show success message
    // For now, just reset and show toast.
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30 py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mb-4">
            <PhoneCall className="h-12 w-12 text-primary mx-auto" />
          </Link>
          <CardTitle className="text-3xl font-bold">Create your Nedzo AI Account</CardTitle>
          <CardDescription>
            Start your free trial for the <span className="font-semibold capitalize text-primary">{planFromQuery || 'Business'}</span> plan.
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
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} placeholder="••••••••" />
              {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" {...register("confirmPassword")} placeholder="••••••••" />
              {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {planFromQuery && (
              <input type="hidden" {...register("plan")} value={planFromQuery} />
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Sign Up for Free Trial"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm">
          <p className="text-muted-foreground">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="font-medium text-primary hover:underline">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>.
          </p>
          <p className="mt-4 text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
