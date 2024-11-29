import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useClerk } from "@clerk/clerk-react";
import { randomID } from "@/lib/utils";


export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  const urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

const VideoUiKit: React.FC = () => {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const { user } = useClerk();

    const myMeeting =  (element: HTMLDivElement ) => {

      const initMeeting = async () => {
        const response = await fetch(`/api/zegocloud?userID=${user?.id}`);
        const { token, appID } = await response.json();
        const username =
          user?.fullName || user?.emailAddresses[0].emailAddress.split("@")[0];
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          appID,
          token,
          roomID,
          user?.id!,
          username
        );

        // Create instance object from Kit Token
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.addPlugins({ ZIM });

        // Start the call
        zp.joinRoom({
          container: element,
          sharedLinks: [
            {
              name: "Personal link",
              url:
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?roomID=" +
                roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify to ZegoUIKitPrebuilt.OneONoneCall
          },
        });
      };
      initMeeting();
    };

    // Initialize the meeting

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default VideoUiKit;
