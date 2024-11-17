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
import { ProjectCard } from "@/components/ProjectCard";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Projects() {
  const { data: session } = useSession();
  const {
    data: userProjects,
    error,
    isLoading,
  } = useSWR(`/api/member/projects?userId=${(session?.user as any)?.id}`);
  console.log("DATA", userProjects);

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
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Expense</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <section className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userProjects.map((project: any) => (
          <ProjectCard project={project} />
        ))}
      </section> */}
    </Layout>
  );
}

export default withAuth(Projects);
