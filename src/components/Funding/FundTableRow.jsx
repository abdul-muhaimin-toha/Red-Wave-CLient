import { TableCell, TableRow } from "../ui/table";

const FundTableRow = ({ fund }) => {
  return (
    <TableRow>
      <TableCell>{fund.donor_name}</TableCell>
      <TableCell>{fund.amount} $</TableCell>
      <TableCell>{new Date(fund.date).toLocaleDateString()}</TableCell>
    </TableRow>
  );
};

export default FundTableRow;
