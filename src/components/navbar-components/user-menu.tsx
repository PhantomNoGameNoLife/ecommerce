import {
  CircleUserRound,
  KeyRound,
  LogOut,
  Signpost,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react";
import user from '@/../public/user.png'
import Image from "next/image"
import { Skeleton } from "../ui/skeleton"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function UserMenu() {
  const pathname = usePathname();
  const { status } = useSession()
  const { data } = useSelector((state: RootState) => state.user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent cursor-pointer">
          <Avatar>
            {status === 'loading' && <Skeleton className="size-8 rounded-full" />}
            {status === 'unauthenticated' && <Image src={user} alt="Profile image" className="rounded-full" />}
            {status === 'authenticated' && data?.addresses?.[data.addresses.length - 1]?.details?.startsWith("http") ?
              <Image src={data?.addresses?.[data.addresses.length - 1]?.details} alt="Profile image" className="rounded-full" />
              : <AvatarFallback className="bg-foreground text-primary-foreground font-bold text-md">{data?.name.charAt(0).toUpperCase()}</AvatarFallback>
            }
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        {data && <>
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {data.name}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {data.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </>}
        <DropdownMenuGroup>
          {status === 'unauthenticated' && <>
            <Link href='/login'>
              <DropdownMenuItem className={`cursor-pointer ${pathname === '/login' ? '!bg-blue-600' : ''}`}>
                <KeyRound size={16} className="opacity-60" aria-hidden="true" />
                <span>SignIn</span>
              </DropdownMenuItem>
            </Link>
            <Link href='/register'>
              <DropdownMenuItem className={`cursor-pointer ${pathname === '/register' ? '!bg-blue-600' : ''}`}>
                <Signpost size={16} className="opacity-60" aria-hidden="true" />
                <span>SignUp</span>
              </DropdownMenuItem>
            </Link>
          </>}
          {status === 'authenticated' && <>
            <Link href='/profile'>
              <DropdownMenuItem className={`cursor-pointer ${pathname === '/profile' ? '!bg-blue-600' : ''}`}>
                <CircleUserRound size={16} className="opacity-60" aria-hidden="true" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => signOut({
              callbackUrl: '/login'
            })} className='cursor-pointer'>
              <LogOut size={16} className="opacity-60" aria-hidden="true" />
              <span>SignOut</span>
            </DropdownMenuItem>
          </>
          }
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
