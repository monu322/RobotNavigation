import { useCallback } from 'react';

import styles from './map.module.scss';

import { PosePayload, useStream, getPoseStream } from '../../lib/stream';
import { Dispatch, SetStateAction } from 'react';

interface MapComponentProps {
    pose?: PosePayload
    setPose:Dispatch<SetStateAction<PosePayload | undefined>>
  }

const Map:React.FC<MapComponentProps> = ({pose, setPose}) => {

    //using robot cordinates as absolute position, compensating for the map padding and icon width and height
    let bottom = pose?pose.y+25:25
    let left = pose?pose.x+15:15
    let angle = pose?(pose.angle*(180/3.14159)-90):0

    const { stream:poseStream } = useStream(getPoseStream, (payload) => setPose(payload));

    //handler function that sends new post request on map click
    const handleMapClick: (e: React.MouseEvent<HTMLDivElement>) => void = (e) => {
        const node = e.target as HTMLElement;
        const bounds = node.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = bounds.height-(e.clientY - bounds.top);
        poseStream?.send({ x: x, y:y, angle: 1.57})
    };

  // Component content
  return (
    <div  className={styles.map_container}>
       <img data-testid="map" onClick={(e)=>handleMapClick(e)} className={styles.map_img} src='/images/map.png' alt='environment map'/>
       <div data-testid="robot_icon_div" className={styles.icon_container} style={{bottom:bottom, left:left, rotate:angle+'deg'}}>
            <img data-testid="robot_icon" className={styles.robot_icon} src='/images/robot-icon.png' alt='robot'/>
            {
                pose?<div className={styles.pose_tooltip}>
                    <span>X: {+pose.x.toFixed(2)} m</span>
                    <span>Y: {+pose.y.toFixed(2)} m</span>
                    <span>Y: {+(pose.angle*(180/3.14159)).toFixed(1)} deg</span>
                </div>:''
            }
            
        </div>
    </div>
  );
};


export default Map;
