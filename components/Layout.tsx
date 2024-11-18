import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
