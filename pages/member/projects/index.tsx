import useSWR from "swr";
import { styled } from "@mui/material/styles";
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
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

type Project = {
  title: string;
  craft: string;
  status: string;
  images: string[];
  startDate: string;
  endDate: string;
  expense: string;
  price: string;
};

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
              <StyledTableCell>Project title</StyledTableCell>
              <StyledTableCell align="right">Craft</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Start Date</StyledTableCell>
              <StyledTableCell align="right">End Date</StyledTableCell>
              <StyledTableCell align="right">Expense</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userProjects.map(
              ({
                title,
                craft,
                status,
                images,
                startDate,
                endDate,
                expense,
                price,
              }: Project) => {
                const statusClassNames =
                  status !== "finished" ? "bg-yellow-100" : "bg-lightGreen-300";
                return (
                  <TableRow
                    key={title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="flex items-center gap-2"
                    >
                      <div className="h-[45px] w-[45px] relative">
                        <Image
                          style={{
                            objectFit: "cover",
                          }}
                          className="rounded"
                          src={images[0] ?? "/no_image.png"}
                          fill
                          alt="project image"
                        />
                      </div>
                      {<b>{title}</b>}
                    </TableCell>
                    <TableCell align="right">{craft}</TableCell>
                    <TableCell align="right">
                      <div
                        className={`${statusClassNames} text-center p-2 rounded-full`}
                      >
                        <b>{status}</b>
                      </div>
                    </TableCell>
                    <TableCell align="right">{startDate}</TableCell>
                    <TableCell align="right">{endDate}</TableCell>
                    <TableCell align="right">{expense}</TableCell>
                    <TableCell align="right">{price}</TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export default withAuth(Projects);
