import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, randomID } from "@/lib/utils";
import { useClerk } from "@clerk/clerk-react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { CircleArrowLeft, Settings, Video } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ZIM } from "zego-zim-web";

type Props = {
  imageUrl?: string;
  name: string;
  userId : string;
  options?: {
    label: string;
    destructive: boolean;
    onClick: () => void;
  }[];
};
export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  const urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

const Header = ({ imageUrl, name, options, userId }: Props) => {
  const roomID = getUrlParams().get("roomID") || randomID(5);

  const handleVideoCall = async() => {
    const response = await fetch(`/api/zegocloud?userID=${userId}`);
    const { token, appID } = await response.json();
  
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      appID,
      token,
      roomID,
      userId,
      name
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.addPlugins({ ZIM });

    const targetUser = {
      userID: userId,  // Update with the actual target user ID
      userName: name,  // Update with the actual target user name
    };

    zp.sendCallInvitation({
      callees: [targetUser],
      callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
      timeout: 60, // Timeout duration (seconds)
    })
      .then((res) => {
        console.log("Call invitation sent successfully", res);
      })
      .catch((err) => {
        console.warn("Failed to send call invitation", err);
      });
  };



  return (
    <Card className="w-full flex rounded-lg items-center p-2 justify-between">
      <div className="flex items-center gap-2">
        <Link href="/conversations" className="block lg:hidden">
          <CircleArrowLeft />
        </Link>
        <Avatar className="h-8 w-8">
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{name}</h2>
      </div>
      <div className="flex gap-2">
        {/* <Link href='/videocall'> */}
        <Button id="videoCall" size="icon" variant="secondary" onClick={handleVideoCall}>
          <Video />
        </Button>
        {/* </Link>  */}
       
        {options ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="secondary">
                <Settings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option, id) => {
                return (
                  <DropdownMenuItem
                    key={id}
                    onClick={option.onClick}
                    className={cn("font-semibold", {
                      "text-destructive": option.destructive,
                    })}
                  >
                    {option.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </Card>
  );
};

export default Header;
