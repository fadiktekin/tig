import { Button } from "@mui/material";

export function NavBar() {
  return (
    <header>
      <nav>
        <ul className="flex justify-between">
          <li>Logo</li>
          <div className="flex justify-between gap-2">
            <li>
              <Button color="secondary" variant="contained">
                Projects
              </Button>
            </li>
            <li>
              <Button color="secondary" variant="contained">
                Sign in
              </Button>
            </li>
            <li>
              <Button variant="contained">Add Project</Button>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
