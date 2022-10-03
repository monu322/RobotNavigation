import styles from './controls.module.scss';

import { useCallback, useState } from 'react';


import { getPoseStream, useStream, PosePayload, PausedPayload, getPausedStream } from '../../lib/stream';


const Controls = () => {

  // Pause state
  const [movement, setMovement] = useState<PausedPayload>();
  const { connected: pausedConnected, stream: pausedStream } = useStream(getPausedStream, (payload) => setMovement(payload));

  // Current pose
  const [pose, setPose] = useState<PosePayload>();
  const { connected: poseConnected, stream:poseStream } = useStream(getPoseStream, (payload) => setPose(payload));

  //state storing co-ordinates for new pose form
  const [X, setX] = useState<string|undefined>();
  const [Y, setY] = useState<string|undefined>();
  const [A, setA] = useState<string|undefined>();

  //handler function to send new pose request after null validation
  const handleNewPose: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {

    e.preventDefault()
    
    if(X && Y && A)
    {
      poseStream?.send({ x: parseFloat(X), y:parseFloat(Y), angle: parseFloat(A)}) 
    }
    
    
};


  //new pose form
  const newPoseForm = <form data-testid="newpose_form" className={styles.newpose_form}>

    <strong>New robot pose</strong>

    <div>
      <label>X</label>
      <input data-testid="x_field" step="0.01" value={X} onChange={(e)=>setX(e.target.value)} type="number" name='x_cord'/>
    </div>

    <div>
      <label>Y</label>
      <input data-testid="y_field" step="0.01" value={Y} onChange={(e)=>setY(e.target.value)} type="number" name='y_cord'/>
    </div>

    <div>
      <label>Angle</label>
      <input data-testid="a_field" step="0.01" value={A} onChange={(e)=>setA(e.target.value)} type="number" name='angle'/>
    </div>

    <button className='btn' onClick={(e)=>handleNewPose(e)}>Submit Pose</button>

  </form>


  // Connection status
  const status = poseConnected ? (
    <div data-testid="connection_status" className={ styles.connected }>
      Connection online <img src='/images/connection.gif' alt="connection on icon" className={styles.online_icon}/>
    </div>
  ) : (
    <div data-testid="connection_status" className={ styles.disconnected }>
      Connection offline <img src='/images/no_connection.png' alt="connection off icon" className={styles.offline_icon}/>
    </div>
  );

  const handleCopy = (pose:PosePayload)=>{
    navigator.clipboard.writeText(`{X : ${pose.x} m, Y : ${pose.y} m, Angle : ${pose.angle} radians}`)
  }

  // Current pose
  const poseValue = (poseConnected && pose) ? (
    <div data-testid="robot_pose" className={ styles.pose }>
      <strong>Current robot pose</strong>
      <code>X : {formatNumber(pose.x)} m<br/>Y : {formatNumber(pose.y)} m<br/>Angle : {formatNumber(pose.angle)} radians</code><br/>
      <button data-testid="copy_button" onClick={()=>handleCopy(pose)} title='Copy to clipboard' className='btn copy-btn'><img src='/images/copy.png'/></button>
    </div>
  ) : (
    null
  );

  const pausedValue = (pausedConnected && movement?.paused)?(
    <div data-testid="movement_status" className={ styles.pose }>
      Robot is paused <img src='/images/stop.png' alt="robot is paused icon" className={styles.offline_icon}/>
    </div>):(
      <div data-testid="movement_status" className={ styles.pose }>
        Robot is moving <img src='/images/moving.gif' alt="robot is moving icon" className={styles.offline_icon}/>
    </div>
    )

  // Pause and unpause buttons
  const pause = useCallback(() => pausedStream?.send({ paused: true }), [pausedStream]);
  const unpause = useCallback(() => pausedStream?.send({ paused: false }), [pausedStream]);

    const controlButtons = (pausedConnected && movement?.paused)?(
      <div className={ styles.pose }>
        <button className='btn' onClick={ unpause }>Start moving</button>
      </div>):(
        <div className={ styles.pose }>
          <button className='btn' onClick={ pause }>Stop moving</button>
      </div>
      )

  const pauseButtons = pausedConnected ? (
    <div className={ styles.buttons }>
      
      
    </div>
  ) : null;

  // Component content
  return (
    <div className={ styles.container }>
      { status }
      
      { pausedValue }

      { controlButtons }

      { poseValue }

      { newPoseForm }

    </div>
  );
};

const formatNumber = (num: number) => +num.toFixed(2);

export default Controls;
