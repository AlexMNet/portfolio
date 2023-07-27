'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Typography } from '../ui/typography';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email required' })
    .email({ message: 'Must be a valid email' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters' }),
});

export default function SigninForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    signIn('credentials', { ...values, redirect: false }).then((callback) => {
      setLoading(false);
      //Returns ok on error Waiting for fix
      if (callback?.ok && !callback?.error) {
        toast.success('Logged in successfully');
        router.push('/admin');
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  }

  return (
    <div className="border rounded-md p-4 max-w-md w-full">
      <div className="my-4">
        <Typography variant="h3" weight="bold">
          Signin{' '}
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormDescription>Enter your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password1234" {...field} />
                </FormControl>
                <FormDescription>Enter your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Submit{' '}
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
          <div className="text-center text-gray-500">
            <Link href="/auth/register">
              Don&apos;t have an account? Register
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
