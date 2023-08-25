'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useContactModal from '@/hooks/useContactModal';
import { Github, Mail, Trash } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
} from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Typography } from '@/components/ui/typography';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@radix-ui/react-dropdown-menu';

export default function Guestbook() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const contactModal = useContactModal();
  const { data: messages, mutate } = useSWR('/api/guest-message', fetcher);

  const deleteMessage = async (id: string) => {
    const loadingToast = toast.loading('Deleting message...');
    try {
      setLoading(true);
      await axios.delete(`/api/guest-message/${id}`);
      toast.success('Message deleted!');
      mutate();
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  const formSchema = z.object({
    message: z.string().nonempty({ message: 'Please enter a message' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { message } = data;
    const loadingToast = toast.loading('Sending message...');

    try {
      setLoading(true);
      await axios.post('/api/guest-message', {
        name: session?.user?.name,
        email: session?.user?.email,
        message,
      });
      toast.success('Message sent!');
      mutate();
      form.reset();
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  const onSignIn = async () => {
    const loadingToast = toast.loading('Signing in...');
    try {
      setLoading(true);
      const res = await signIn('github', { redirect: false });
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        disabled={loading}
        variant="default"
        size="sm"
        onClick={() => contactModal.onOpen()}
      >
        <Mail className="mr-1 w-5 h-5" /> Send me an email!
      </Button>

      <div className="mt-6">
        <Typography variant="h5" weight="bold" className="mb-3">
          GuestBook
        </Typography>
        {!session?.user && (
          <Button
            disabled={loading}
            variant="outline"
            size="sm"
            onClick={onSignIn}
            className={`${loading ? 'animate-pulse' : ''}`}
          >
            <Github className="mr-1 w-5 h-5" /> Sign in with Github
          </Button>
        )}
        {session?.user && (
          <div className="flex flex-col items-start justify-center max-w-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-start justify-start gap-1 w-full "
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="type a message" {...field} />
                      </FormControl>
                      <FormDescription>
                        Signed in as: {session.user.name}{' '}
                        <Button
                          type="button"
                          onClick={() => signOut()}
                          variant="link"
                        >
                          Sign out
                        </Button>
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Button disabled={loading} type="submit" variant="outline">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        )}
        <Separator />
        <ScrollArea className="mt-6 h-[650px] max-w-lg">
          {messages?.map(
            ({
              id,
              name,
              message,
              email,
              createdAt,
            }: {
              id: string;
              name: string;
              message: string;
              email: string;
              createdAt: string;
            }) => (
              <div
                key={id}
                className="p-2 dark:bg-neutral-900 bg-gray-200 rounded-md max-w-lg my-4"
              >
                <div className="text-sm mb-1 flex items-center gap-1">
                  <Typography variant="smallText" weight="bold">
                    {name}
                  </Typography>
                  <div> • </div>
                  <Typography variant="xsText" weight="light">
                    {new Date(createdAt).toLocaleDateString('en-US', {
                      day: '2-digit',
                      year: '2-digit',
                      month: 'long',
                      weekday: 'short',
                    })}
                  </Typography>
                  {session?.user?.email === email && (
                    <button onClick={() => deleteMessage(id)}>
                      <Trash className="w3 h-3 stroke-red-500" />
                    </button>
                  )}
                </div>
                <div>
                  <Typography
                    variant="smallText"
                    weight="light"
                    className="m-0 font-thin"
                  >
                    {message}
                  </Typography>
                </div>
              </div>
            )
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
