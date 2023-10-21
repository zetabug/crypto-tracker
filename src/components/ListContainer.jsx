import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Box } from '@mui/material';

function ListContainer({ coins }) {
  const headerCellStyle = {
    background: 'black',
    color: 'white',
    textAlign:'center',
  };

  const tableContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const tableStyle = {
    border: '1px solid #ccc', // Add your desired border style here
    padding: '20px', // Add your desired padding here
  };
  const rowStyle = {
    textAlign:'center',
  };

  return (
    <Box style={tableContainerStyle}>
      <Table style={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell style={headerCellStyle}>COIN</TableCell>
            <TableCell style={headerCellStyle}>NAME</TableCell>
            <TableCell style={headerCellStyle}>PRICE</TableCell>
            <TableCell style={headerCellStyle}>CHANGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            coins && coins.map((x) =>

              <TableRow
                key={x.name}
                onClick={() => { window.location.href = `./coins/${x.uuid}` }}
                style={{cursor:'pointer'}}
              >
                <TableCell style={rowStyle}>
                  <img src={x.iconUrl} alt='cryptoimg' width='50px' style={rowStyle}/>
                </TableCell>
                <TableCell style={rowStyle}>
                  {x.name}
                </TableCell>
                <TableCell style={rowStyle}>$ {Number(x.price).toFixed(2)}</TableCell>
                <TableCell style={{ color: x.change > 0 ? "green" : "red", fontWeight: 'bolder',textAlign:'center' }}>{x.change}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </Box>

  );
}

export default ListContainer;
