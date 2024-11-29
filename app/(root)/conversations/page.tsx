'use client'
import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
// import { useUser } from '@clerk/clerk-react';
// import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {}

const ConversationPage = (props: Props) => {
  // const { isSignedIn } = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //     if (!isSignedIn) {
  //       // If the user is not signed in, redirect to the login page
  //       console.log("User is not signed in. Redirecting to login.");
  //       router.push("/login");
  //     }else{
  //       router.push('/conversations')
  //     } 
  //   }, [isSignedIn, router]);
  
  return (
    <ConversationFallback/>
  )
}

export default ConversationPage