'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
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

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email required' })
    .email({ message: 'Must be a valid email' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters' }),
  name: z.string().min(3, { message: 'Name required' }),
});

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post('/api/register', values);
      toast.success('Account created successfully');

      if (res.status === 200) {
        signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/admin',
        });
      }
    } catch (error: any) {
      console.log('Register error: ', error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded-md p-4 max-w-md w-full">
      <div className="my-4">
        <Typography variant="h3" weight="bold">
          Register{' '}
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ellie" {...field} />
                </FormControl>
                <FormDescription>Enter your first name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="thelastofus@gmail.com" {...field} />
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
                  <Input placeholder="dina1234" {...field} />
                </FormControl>
                <FormDescription>Enter your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Register{' '}
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
          <div className="text-center text-gray-500">
            <Link href="/auth/signin">Have an account? Sign in!</Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
