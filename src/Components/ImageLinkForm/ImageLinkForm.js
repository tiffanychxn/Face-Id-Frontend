import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
    <div className='ma4 mt0'> 
        <p className='f3'>
            {'This magic brain will detect faces in your pictures'}
        </p>
        <div className = 'center'>
            <div className = 'form center pa4 br3 shadow-5'> 
            <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}></input>
            <button className='w-30 grow f4 link ph3 pv dib white bg-light-blue' onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    </div>

    );
}

export default ImageLinkForm;