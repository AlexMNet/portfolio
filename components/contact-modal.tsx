'use client';
import useContactModal from '@/hooks/useContactModal';
import { DisplayModal } from './ui/modal';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useState, useRef } from 'react';
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
} from './ui/form';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function ContactModal() {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose } = useContactModal();
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
    const loadingToast = toast.loading('Sending email...');
    try {
      setLoading(true);
      if (!recaptchaRef.current?.getValue()) {
        throw new Error('Please complete the captcha');
      }

      const token = recaptchaRef.current?.getValue();
      const captchaResponse = await axios.post('/api/captcha', { token });

      if (!captchaResponse.data.success) {
        throw new Error('Something went wrong. Try again.');
      }

      await axios.post('/api/sendgrid', data);
      toast.success('Email sent successfully!');
      onClose();
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
      recaptchaRef.current?.reset();
      form.reset();
    }
  }

  const body = (
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
      </form>
    </Form>
  );

  return (
    <DisplayModal
      title="Send an email!"
      isOpen={isOpen}
      onClose={onClose}
      body={body}
      className="max-w-lg"
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={loading}
    />
  );
}
