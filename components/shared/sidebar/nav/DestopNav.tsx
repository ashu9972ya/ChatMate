"use client";
import { useNavigation } from "@/hooks/useNavigation";
import { Card } from "@/components/ui/card";
import { SignIn, SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme/theme.toggle";
import { Badge } from "@/components/ui/badge";
import { Unauthenticated, Authenticated } from "convex/react";

const DestopNav = () => {
  const paths = useNavigation();

  return (
    <Card className="hidden lg:flex lg:flex-col lg: justify-between lg:items-center lg: h-full lg: w-16 lg: px-2 lg:py-4">
      <nav>
        <ul className="flex flex-col items-center gap-4">
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant={path.active ? "default" : "outline"}
                      >
                        <>
                          {path.icon}
                          {path.count ? (
                            <Badge className="absolute left-6 bottom-7 px-2 bg-blue-500">
                              {path.count}
                            </Badge>
                          ) : null}
                        </>
                      </Button>
                      {/* {path.count ? <Badge className="absolute left-6 bottom-7 px-2">{path.count}</Badge> : null} */}
                    </TooltipTrigger>
                    <TooltipContent>{path.name}</TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle />
        <Authenticated>
          <UserButton />
        </Authenticated>
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
      </div>
    </Card>
  );
};

export default DestopNav;
