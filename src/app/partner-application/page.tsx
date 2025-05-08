
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake } from "lucide-react";
import Link from "next/link";

const partnerApplicationSchema = z.object({
  agencyName: z.string().min(2, "Agency name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").optional().or(z.literal('')),
  clientBaseSize: z.enum(["1-10", "11-50", "51-200", "200+"], { required_error: "Please select your client base size" }),
  currentServices: z.string().min(10, "Please describe your current services (min 10 characters)"),
  whyPartner: z.string().min(20, "Please tell us why you want to partner (min 20 characters)"),
});

type PartnerApplicationFormValues = z.infer<typeof partnerApplicationSchema>;

export default function PartnerApplicationPage() {
  const { toast } = useToast();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnerApplicationFormValues>({
    resolver: zodResolver(partnerApplicationSchema),
  });

  const onSubmit: SubmitHandler<PartnerApplicationFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Partner application submitted:", data);
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest! Our team will review your application and get back to you soon.",
    });
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30 py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <Link href="/partners" className="inline-block mb-4" prefetch={false}>
            <Handshake className="h-12 w-12 text-primary mx-auto" />
          </Link>
          <CardTitle className="text-3xl font-bold">Become a Nedzo AI Partner</CardTitle>
          <CardDescription>
            Join us in revolutionizing agency communications. Fill out the form below to apply.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="agencyName">Agency Name</Label>
                <Input id="agencyName" {...register("agencyName")} placeholder="Your Awesome Agency" />
                {errors.agencyName && <p className="text-sm text-destructive mt-1">{errors.agencyName.message}</p>}
              </div>
              <div>
                <Label htmlFor="contactName">Contact Person Name</Label>
                <Input id="contactName" {...register("contactName")} placeholder="Jane Smith" />
                {errors.contactName && <p className="text-sm text-destructive mt-1">{errors.contactName.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register("email")} placeholder="jane@youragency.com" />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="website">Agency Website (Optional)</Label>
              <Input id="website" {...register("website")} placeholder="https://youragency.com" />
              {errors.website && <p className="text-sm text-destructive mt-1">{errors.website.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="clientBaseSize">Approximate Client Base Size</Label>
              <Controller
                name="clientBaseSize"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="clientBaseSize">
                      <SelectValue placeholder="Select client base size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 Clients</SelectItem>
                      <SelectItem value="11-50">11-50 Clients</SelectItem>
                      <SelectItem value="51-200">51-200 Clients</SelectItem>
                      <SelectItem value="200+">200+ Clients</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.clientBaseSize && <p className="text-sm text-destructive mt-1">{errors.clientBaseSize.message}</p>}
            </div>

            <div>
              <Label htmlFor="currentServices">Current Services Offered</Label>
              <Textarea
                id="currentServices"
                {...register("currentServices")}
                placeholder="e.g., SEO, PPC, Web Design, Social Media Marketing..."
                rows={3}
              />
              {errors.currentServices && <p className="text-sm text-destructive mt-1">{errors.currentServices.message}</p>}
            </div>

            <div>
              <Label htmlFor="whyPartner">Why do you want to partner with Nedzo AI?</Label>
              <Textarea
                id="whyPartner"
                {...register("whyPartner")}
                placeholder="Tell us how Nedzo AI can benefit your clients and your agency..."
                rows={4}
              />
              {errors.whyPartner && <p className="text-sm text-destructive mt-1">{errors.whyPartner.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
         <CardFooter className="text-center text-sm">
          <p className="text-muted-foreground">
            By submitting this application, you agree to our Partner Program{' '}
            <Link href="/terms#partner-program" className="font-medium text-primary hover:underline" prefetch={false}>
              Terms and Conditions
            </Link>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
