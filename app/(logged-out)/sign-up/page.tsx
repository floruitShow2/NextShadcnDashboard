'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { PersonStandingIcon } from 'lucide-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ACCOUNT_TYPE_ENUM } from '@/lib/enums'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = z.object({
  email: z.string().email(),
  accountType: z.enum([ACCOUNT_TYPE_ENUM.PERSONAL, ACCOUNT_TYPE_ENUM.COMPANY]),
  companyName: z.string().optional(),
  employeesCount: z.coerce.number().optional()
}).superRefine((data, ctx) => {
  if (data.accountType === ACCOUNT_TYPE_ENUM.COMPANY) {
    if (!data.companyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['companyName'],
        message: 'Company name is required',
      })
    }

    if (!data.employeesCount || data.employeesCount < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['employeesCount'],
        message: 'The count of employees is required and must be greater than 0',
      })
    }
  }
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      accountType: ACCOUNT_TYPE_ENUM.PERSONAL
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  const localAccountType = form.watch('accountType')
  const CompanyPartialForm = () => {
    return localAccountType === ACCOUNT_TYPE_ENUM.COMPANY ? <>
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Company Name"
                {...field}
              ></Input>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="employeesCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employees</FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder="Employees Count"
                {...field}
              ></Input>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
    </> : <></>
  }

  return (
    <>
      <PersonStandingIcon size={50} className="text-pink-500" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Sign up for a new SupportMe account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='flex flex-col gap-y-4' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="chengminglong@digital-engine.com"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormDescription>
                      This is the email address you signed up to SupportMe Dashboard
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              {/* account type */}
              <FormField
                control={form.control}
                name='accountType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select an account type'></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ACCOUNT_TYPE_ENUM.PERSONAL}>Personal</SelectItem>
                        <SelectItem value={ACCOUNT_TYPE_ENUM.COMPANY}>Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <CompanyPartialForm />
              {/* submit */}
              <Button type="submit">Sign up</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Already have a account?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
