import React from 'react';
import Tilt from 'react-tilt';
import jerry from './jerry.png';
import './Logo.css';

const Logo = () => {
    return(
    <div className='ma4 mt0'> 
        <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner"> 
                <img style={{paddingTop: '5px'}} alt= 'logo' src={jerry}>
                </img>
            </div>
        </Tilt>        
    </div>

    );
}

export default Logo;