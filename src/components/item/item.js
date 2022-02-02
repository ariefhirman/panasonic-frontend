import React from 'react';
import { Typography } from '@mui/material';

const ItemBox = (props) => {
    // const { movies } = useContext(MovieContext)
    // const context = useContext(MovieContext)

    const number = props.boxNumber;
    let statusBox = props.status;
    
    const renderNumber = (number) => {
        if(number <= 17) {
            return (
                <Typography color="#FFF" variant="subtitle1" key={number}
                    align="center"
                    sx={{ paddingRight: '1em'}}
                >
                    {number}
                </Typography>
            );
        }
    }

    return (
        // <div className="col-2 col-md-2">
        //     <div className={`seat seat-${seatNumber} ${seatStatus}`}
        //         onClick={(e) => seatClickHandler(e,props.seatno)} />
        // </div>
        <div className="col-md-2">
            {renderNumber(number)}
            <div className={`box box-${number} ${statusBox}`} style={{ marginBottom: '1em' }}/>
        </div>
    )
}

export default ItemBox