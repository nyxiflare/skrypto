
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PenLine, DollarSign, Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CategorySelector from './CategorySelector';

// Form validation schema using Zod
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  description: z.string().min(50, {
    message: "Please provide a detailed description of your service (at least 50 characters).",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  amount: z.string().min(1, {
    message: "Please enter your rate.",
  }),
  token: z.enum(["ETH", "USDT", "MATIC"], {
    required_error: "Please select a payment token.",
  })
});

const OfferSkillForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      title: "",
      description: "",
      category: "",
      amount: "",
      token: "ETH"
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here we would typically send the data to a backend or smart contract
    
    // Show success toast
    toast({
      title: "Skill offered successfully!",
      description: "Your service is now live on the Skrypto marketplace.",
      variant: "default",
    });
  };

  return (
    <div className="glass p-8 rounded-xl max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username/Alias</FormLabel>
                <FormControl>
                  <Input placeholder="CryptoArtist92" {...field} className="bg-skrypto-darker border-white/10 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Skill Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="I will design a professional logo" 
                    {...field} 
                    className="bg-skrypto-darker border-white/10 text-white" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Category</FormLabel>
                <FormControl>
                  <CategorySelector value={field.value} onValueChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your service in detail. Include what the buyer will receive, your experience, turnaround time, etc." 
                    {...field}
                    className="bg-skrypto-darker border-white/10 text-white min-h-[120px]" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Rate Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.05" 
                      {...field}
                      className="bg-skrypto-darker border-white/10 text-white" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Payment Token</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ETH" className="text-skrypto-purple" />
                        </FormControl>
                        <FormLabel className="text-white cursor-pointer">ETH</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="USDT" className="text-skrypto-green" />
                        </FormControl>
                        <FormLabel className="text-white cursor-pointer">USDT</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="MATIC" className="text-skrypto-blue" />
                        </FormControl>
                        <FormLabel className="text-white cursor-pointer">MATIC</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-skrypto-green hover:bg-skrypto-green/90 text-white glow-green flex items-center gap-2"
          >
            <PenLine size={18} />
            Publish Your Service
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OfferSkillForm;
