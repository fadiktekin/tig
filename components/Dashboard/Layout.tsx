import { Menu } from "./Menu";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <section className="flex flex-column h-full">
      <Menu />
      <main className="p-4">{children}</main>
    </section>
  );
}
