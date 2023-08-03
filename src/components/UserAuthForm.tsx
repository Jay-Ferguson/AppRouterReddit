"use client"

import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import {signIn} from "next-auth/react"
import { Icons } from "./ui/Icons";
import { useToast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement>{}

const UserAuthForm: FC<UserAuthFormProps> = ({ className,...props}) => {

     const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast();
     const loginWithGoogle = async () => {
          setIsLoading(true)

          try{ 
               await signIn('google')
          } catch (error) {
            toast({
              title: 'there was a problem',
              description:'there was an error loggin in with Google',
              variant: 'destructive',
            })
                    // toast notification
               } finally {
                    setIsLoading(false)
               }
          }
     
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
          {isLoading ? null : <Icons.google className="h-4 w-6" /> }
        User auth form
      </Button>
    </div>
  );
};

export default UserAuthForm;
