import React from 'react';
import CubeImage from './CubeImage';

export default function Cube() {
    return (
        <div className="scene">
            <div className="cube">
                <CubeImage src="/IMG_3649.JPG" alt="principle photo" face="front" />
                <CubeImage src="/cuisinier.jpg" alt="cuisinier photo" face="back" />
                <CubeImage src="/IMG_3649.JPG" alt="principle photo" face="left" />
                <CubeImage src="/cuisinier.jpg" alt="cuisinier photo" face="right" />
                <CubeImage src="/IMG_3649.JPG" alt="principle photo" face="bottom" />
                <CubeImage src="/cuisinier.jpg" alt="cuisinier photo" face="top" />
            </div>
        </div>
    );
}
