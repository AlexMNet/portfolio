'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const formSchema = z.object({
    fullName: z
      .string()
      .nonempty({ message: 'Please enter your full name' })
      .min(2, { message: 'Name must be a minimum of 2 letters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    subject: z.string().nonempty({ message: 'Please enter a subject' }),
    message: z.string().nonempty({ message: 'Please enter a message' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const loadingToast = toast.loading('Sending email...');
      if (!recaptchaRef.current?.getValue()) {
        throw new Error('Please complete the captcha');
      }

      const token = recaptchaRef.current?.getValue();
      const captchaResponse = await axios.post('/api/captcha', { token });

      if (!captchaResponse.data.success) {
        throw new Error('Something went wrong. Try again.');
      }

      await axios.post('/api/sendgrid', data);
      toast.dismiss(loadingToast);
      toast.success('Email sent successfully!');
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
      recaptchaRef.current?.reset();
      form.reset();
    }
  }

  return (
    <div className="border rounded-md p-4 max-w-sm w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name:</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message:</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-start items-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            />
          </div>
          <div className="flex justify-end items-center">
            <Button type="submit" disabled={loading}>
              Send{' '}
              {loading ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
