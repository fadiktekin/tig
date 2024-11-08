import { useSession, signIn, signOut } from "next-auth/react";

export default function Projects() {
  const { data, status } = useSession();
  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    return (
      <div>
        <h1> hi {(data as any).user.name}</h1>
        <img
          src={(data as any).user.image}
          alt={(data as any).user.name + " photo"}
        />
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn("google")}>sign in with gooogle</button>
    </div>
  );
}
