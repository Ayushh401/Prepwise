"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateUserProfile } from "@/lib/actions/auth.action";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  resume: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  bio: z.string().max(160).optional(),
});

interface ProfileFormProps {
  user: User;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      resume: user.resume || "",
      bio: user.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await updateUserProfile({
        userId: user.id,
        name: values.name,
        resume: values.resume,
        bio: values.bio,
      });

      if (result.success) {
        toast.success("Profile updated successfully!");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-light-100">Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} className="form-input bg-dark-300 border-border/50 rounded-xl h-12" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-light-100">Resume URL</FormLabel>
                <FormControl>
                    <Input placeholder="https://..." {...field} className="form-input bg-dark-300 border-border/50 rounded-xl h-12" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-100">Short Bio</FormLabel>
              <FormControl>
                <Textarea 
                    placeholder="Tell us about yourself..." 
                    className="bg-dark-300 border-border/50 rounded-2xl min-h-[100px] resize-none"
                    {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="btn-primary w-full md:w-fit h-12 px-10 gap-2" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Updating...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Changes
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
