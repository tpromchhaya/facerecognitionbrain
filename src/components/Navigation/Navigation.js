import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) =>{
        if(isSignedIn){
            return(
                <nav style ={{display : 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signout')} className='f6 grow no-underline br-pill ba ph3 pv2 mb4 dib near-black'>Sign Out</p>
                </nav>
             );     
        } else {
            return(
                <nav style ={{display : 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f6 grow no-underline br-pill ba ph3 pv2 mb4 dib near-black'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f6 grow no-underline br-pill ba ph3 pv2 mb4 dib near-black'>Register</p>
                </nav>             
            ); 
        }
} 

export default Navigation;