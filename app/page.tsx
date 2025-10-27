import Image from "next/image";
import Hello from "./components/hello";

export default function Home() {
  console.log("What am I? -- SERVER/CLIENT")
  return (
    <>
      <h1 className="text-3xl">Welcome to SEO website</h1>
      <Hello/>

    </>

  );
}
