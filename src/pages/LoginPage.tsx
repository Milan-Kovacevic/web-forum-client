import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {} from "lucide-react";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormFieldItem from "@/components/form/FormFieldItem";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  displayName: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "E-Mail must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "E-Mail must be at least 2 characters.",
  }),
  repeatPassword: z.string().min(2, {
    message: "E-Mail must be at least 2 characters.",
  }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <div className="w-full h-full absolute"></div>
      <div className="w-full h-full flex items-center justify-center">
        <Card className="overflow-clip dark:border-border rounded-2xl border-muted-foreground border-2 h-auto shadow-2xl flex">
          <div className="backdrop-blur dark:border-r-2 supports-[backdrop-filter]:bg-background/70 lg:w-[860px] basis-8/12 bg-background relative flex flex-col p-4 sm:p-10 md:px-14 flex-1 w-auto">
            <div className="flex flex-wrap z-10 flex-col gap-5 lg:w-auto md:my-3 p-6">
              <div className="flex flex-col gap-2 justify-center items-center mb-5">
                <h1 className="sm:text-4xl text-3xl font-bold text-center tracking-tighter text-gradient !bg-clip-text text-transparent !bg-cover !bg-center">
                  Create an account
                </h1>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Enter your information below to create your account
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex gap-2 flex-col w-full items-center justify-center"
                >
                  <FormFieldItem
                    control={form.control}
                    name="displayName"
                    display="Display Name"
                    description="This is your public display name."
                    placeholder="forum user"
                  />
                  <FormFieldItem
                    control={form.control}
                    name="username"
                    display="Username"
                    placeholder="your username"
                  />
                  <FormFieldItem
                    control={form.control}
                    name="email"
                    display="E-Mail"
                    placeholder="name@example.com"
                  />

                  <FormFieldItem
                    control={form.control}
                    type="password"
                    name="password"
                    display="Password"
                    placeholder="your password"
                  />
                  <FormFieldItem
                    control={form.control}
                    type="password"
                    name="repeatPassword"
                    display="Repeat Password"
                    placeholder="repeat password"
                    description="Note: passwords must match"
                  />

                  <Button
                    size="sm"
                    variant="default"
                    type="submit"
                    className="w-full mt-8 font-semibold"
                  >
                    Register / Sign Up
                  </Button>
                </form>
              </Form>

              <div className="flex flex-row w-full gap-1 items-center">
                <span className="w-full border-t flex-1" />
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="!bg-clip-text bg-background font-semibold px-2 text-accent-foreground">
                    Or continue with
                  </span>
                </div>
                <span className="w-full border-t flex-1" />
              </div>
              <div className="flex sm:flex-row flex-col gap-2 w-full">
                <Button
                  className="sm:flex-1"
                  size="sm"
                  variant="outline"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
                <Button
                  className="sm:flex-1"
                  size="sm"
                  variant="outline"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  className="sm:flex-1"
                  size="sm"
                  variant="outline"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden relative lg:flex bg-clip-content bg-gradient basis-4/12">
            <div className="absolute right-0 top-0 m-6 flex flex-col justify-center items-end gap-3">
              <Button size="sm" className="text-sm" variant="outline">
                Login / Sign in
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
