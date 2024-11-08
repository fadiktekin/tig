import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { MouseEventHandler } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main className="p-4">{children}</main>
      <Footer />
    </>
  );
}
