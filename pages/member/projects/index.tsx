import useSWR from "swr";
import { withAuth } from "@/components/withAuth";
import { useSession } from "next-auth/react";
import { Layout } from "@/components/Dashboard/Layout";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";

function createData(title: string, craft: string, status: string) {
  return { title, craft, status };
}

function Projects() {
  const { data: session } = useSession();
  const {
    data: userProjects,
    error,
    isLoading,
  } = useSWR(`/api/member/projects?userId=${(session?.user as any)?.id}`);
  console.log("DATA", userProjects);

  const rows: any[] = [];
  userProjects &&
    userProjects.map((project: any) => {
      rows.push(createData(project.title, project.craft, project.status));
    });

  if (!userProjects) {
    return <>loading...</>;
  }
  return (
    <Layout>
      <Typography variant="h4" className="pb-4">
        My projects
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {" "}
                <b>Project title</b>
              </TableCell>
              <TableCell align="right">Craft</TableCell>
              <TableCell align="right">Status</TableCell>
              {/* <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Expense</TableCell>
              <TableCell align="right">Price</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.craft}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export default withAuth(Projects);
