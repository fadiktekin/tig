import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="p-4">{children}</main>
      <Footer />
    </>
  );
}
