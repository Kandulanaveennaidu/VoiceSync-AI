
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from 'next/navigation';
import { useEffect } from "react";

const contactSalesSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  plan: z.string().optional(),
});

type ContactSalesFormValues = z.infer<typeof contactSalesSchema>;

export default function ContactSalesPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const planFromQuery = searchParams.get('plan');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactSalesFormValues>({
    resolver: zodResolver(contactSalesSchema),
    defaultValues: {
      plan: planFromQuery || "",
    }
  });

  useEffect(() => {
    if (planFromQuery) {
      setValue('plan', planFromQuery);
    }
  }, [planFromQuery, setValue]);

  const onSubmit: SubmitHandler<ContactSalesFormValues> = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Sales contact form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "Our sales team will get back to you shortly.",
    });
    reset();
     if (planFromQuery) {
      setValue('plan', planFromQuery);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          Contact Our Sales Team
        </h1>
        <p className="text-muted-foreground mb-10 text-center">
          We're excited to learn about your agency's needs and how Nedzo AI can help you scale. Please fill out the form below, and one of our sales specialists will be in touch.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register("name")} placeholder="John Doe" />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...register("email")} placeholder="you@company.com" />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" {...register("company")} placeholder="Your Agency Inc." />
            {errors.company && <p className="text-sm text-destructive mt-1">{errors.company.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input id="phone" type="tel" {...register("phone")} placeholder="+1 (555) 123-4567" />
          </div>

          {planFromQuery && (
            <div>
              <Label htmlFor="plan">Selected Plan</Label>
              <Input id="plan" {...register("plan")} readOnly className="bg-muted/50" />
            </div>
          )}

          <div>
            <Label htmlFor="message">How can we help you?</Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Tell us about your needs, number of agents, call volume, etc."
              rows={5}
            />
            {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
}
