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
import { useRouter } from "next/router";
import { StatusTag } from "@/components/StatusTag";
import { capitalizeFirstLetter } from "@/components/utils/capitalizeFirstLetter";

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
  _id: string;
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

  const router = useRouter();
  console.log("userProjects", userProjects);

  if (!userProjects) {
    return <>loading...</>;
  }

  const handleClick = (id: string) => {
    router.push(`/member/projects/${id}`);
  };

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
              <StyledTableCell align="center">Craft</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Start Date</StyledTableCell>
              <StyledTableCell align="center">End Date</StyledTableCell>
              <StyledTableCell align="center">Expense</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userProjects.map(
              ({
                _id,
                title,
                craft,
                status,
                images,
                startDate,
                endDate,
                expense,
                price,
              }: Project) => {
                return (
                  <TableRow
                    hover
                    key={_id}
                    onClick={(event) => handleClick(_id)}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <div className="flex items-center gap-2">
                        <div className="h-[45px] w-[45px] relative">
                          <Image
                            style={{
                              objectFit: "cover",
                            }}
                            className="rounded"
                            src={images[0] ?? "/no_image.png"}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            alt="project image"
                          />
                        </div>

                        {<b>{capitalizeFirstLetter(title)}</b>}
                      </div>
                    </TableCell>
                    <TableCell align="center">{craft}</TableCell>
                    <TableCell align="center">
                      <div className="w-full flex justify-center">
                        <StatusTag status={status} />
                      </div>
                    </TableCell>
                    <TableCell align="center">{startDate}</TableCell>
                    <TableCell align="center">{endDate}</TableCell>
                    <TableCell align="center">{expense}</TableCell>
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
