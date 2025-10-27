// app/dashboard/users/[id]/page.tsx
import React from "react";

export default async function Page({params,}: {params: Promise<{ id: string }>;}) 
{
  const { id } = await params; // ✅ unwrap the Promise
  return <h1>User Profile: {id}</h1>;
}
