import { Menu } from "./Menu";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <section className="flex flex-column h-full w-full justify-start">
      <Menu />
      <div className="p-4 w-full min-w-80">{children}</div>
    </section>
  );
}
