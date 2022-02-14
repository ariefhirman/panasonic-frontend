import React from 'react';
import { Typography } from '@mui/material';
// import './item.css';

const ItemBoxConfig = (props) => {
    // const { movies } = useContext(MovieContext)
    // const context = useContext(MovieContext)
    let number = props.boxNumber;
    let statusBox = props.status;
    let listEmpty = props.emptylayout;

    let selected = false;

    const renderNumber = (number) => {
        if(number <= 17) {
            return (
                <Typography color="#FFF" variant="subtitle1" key={number}
                    align="center"
                >
                    {number}
                </Typography>
            );
        }
    }

    const boxClickHandler = (event) => {
        selected = !selected;
        const boxColor = document.querySelector(`.box-${number}`).classList;
        if (listEmpty.includes(number)) {
            boxColor.remove(`.box-${number}`);
        } else {
            if (selected) {
                props.parentcallback(number);
                boxColor.remove("box-black");
                boxColor.add("box-grey");
            } 
        }
        // else {
        //     boxColor.remove("box-grey");
        //     boxColor.add("box-black");
        // }
        event.preventDefault();
    }

    return (
        <div className="col-md-2">
            {renderNumber(number)}
            <div 
                className={`box box-${number} ${statusBox}`} 
                style={{ marginBottom: '1em' }}
                onClick={(e) => boxClickHandler(e,props.boxNumber)}
            />
        </div>
    )
}

export default ItemBoxConfig;