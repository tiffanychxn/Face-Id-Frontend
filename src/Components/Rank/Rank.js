import React from 'react';
const Rank = ({name,entries}) => {
    return(
    <div className='ma4 mt0'> 
        <div className='white f3'>
            <span>{name}</span>
            <span>{', your current entry count is...'}</span>            
        </div>
        <div className='white f1'>
            {entries}
        </div>

    </div>

    );
}

export default Rank;