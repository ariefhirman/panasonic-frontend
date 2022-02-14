import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';

export const ProductScannedList = ({ products, ...rest }) => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedProductIds;

    if (event.target.checked) {
      newSelectedProductIds = products.map((product) => product.id);
    } else {
      newSelectedProductIds = [];
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProductIds.indexOf(id);
    let newSelectedProductIds = [];

    if (selectedIndex === -1) {
      nnewSelectedProductIds = newSelectedProductIds.concat(selectedProductIds, id);
    } else if (selectedIndex === 0) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds.slice(1));
    } else if (selectedIndex === selectedProductIds.length - 1) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds.slice(0, selectedIndex),
        selectedProductIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const renderStatus = (status) => {
    let color = '#11AC92';
    if (status == 'Low') {
      color="#F2A900";
    } 

    return (
      <Typography color={color} variant="caption">
        {status}
      </Typography>
    );
  }

  const renderNote = (note) => {
    let noteInfo = '-';
    if (note != '') {
      noteInfo = note;
    };

    return (
      <Typography color="#FFF" variant="caption">
        {noteInfo}
      </Typography>
    );
  }

  return (
    <Card {...rest} sx={{ margin: '2em', marginTop: '1em'}}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 920 }}>
          <Table sx={{
            backgroundColor: 'neutral.900',
            border: "1px solid #646A7B"
          }}>
            <TableHead sx={{ backgroundColor: '#252F3A'}}>
              <TableRow >
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  <Typography color="#FFF" variant="body">
                    No
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="#FFF" variant="body">
                    Segment
                  </Typography>
                </TableCell>
                {/* <TableCell>
                  <Typography color="#FFF" variant="body">
                    Floor
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Typography color="#FFF" variant="body">
                    Product Code
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="#FFF" variant="body">
                    Confidence Level
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="#FFF" variant="body">
                    Note
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="#FFF" variant="body">
                    Last Scanned
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: '#161C23'}}>
              {products.slice(0, limit).map((product, i) => (
                <TableRow
                  hover
                  key={product.id}
                  selected={selectedProductIds.indexOf(product.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Typography color="#FFF" variant="caption">
                      {i+1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar> */}
                      <Typography
                        color="#FFF"
                        variant="body1"
                      >
                        {product.segment}
                      </Typography>
                    </Box>
                  </TableCell>
                  {/* <TableCell>
                    <Typography color="#FFF" variant="caption">
                      {product.floor}
                    </Typography>
                  </TableCell> */}
                  <TableCell>
                    {/* <Typography color="#FFF" variant="caption">
                      {`${product.address.city}, ${product.address.state}, ${product.address.country}`}
                    </Typography> */}
                    <Typography color="#FFF" variant="caption">
                      {product.productCode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {/* {
                      if ({product.status == 'Match'}) {
                        return (
                          <Typography color="green" variant="caption">
                            {customer.phone}
                          </Typography>
                        )
                      }
                    } */}
                    {renderStatus(product.confidence_level)}
                  </TableCell>
                  <TableCell>
                    {renderNote(product.note)}
                  </TableCell>
                  <TableCell>
                    <Typography color="#FFF" variant="caption">
                      {format(product.createdAt, 'dd/MM/yyyy')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        sx={{ backgroundColor: '#252F3A', color: '#FFF'}}
        component="div"
        count={products.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProductScannedList.propTypes = {
  products: PropTypes.array.isRequired
};
