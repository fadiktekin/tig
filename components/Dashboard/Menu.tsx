import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";

import { useState } from "react";
import { useRouter } from "next/router";
export function Menu() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <aside className="h-full bg-creamBackgroundTertiary border-r-2 border-r-accent">
      <List component="nav" aria-label="main projects settings">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => {
            handleListItemClick(event, 0);
            router.push("/member/projects");
          }}
        >
          <ListItemIcon className="min-w-8">
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="My Projects" className="text-nowrap" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => {
            handleListItemClick(event, 1);
            router.push("/member/settings");
          }}
        >
          <ListItemIcon className="min-w-8">
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" className="text-nowrap" />
        </ListItemButton>
      </List>
    </aside>
  );
}
