import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main className="p-4 h-screen">{children}</main>
      <Footer />
    </>
  );
}
