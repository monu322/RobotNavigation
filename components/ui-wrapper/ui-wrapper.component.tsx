import dynamic from 'next/dynamic';
import styles from './ui-wrapper.module.scss';

import { useCallback, useState } from 'react';

import { getPoseStream, useStream, PosePayload, getPausedStream } from '../../lib/stream';

const Controls = dynamic(() => import('../../components/controls/controls.component'), { ssr: false });
const Map = dynamic(() => import('../../components/map/map.component'), { ssr: false });

const UiWrapper = () => {

  //A Wrapper compoent, housing the Controls and Map component

  // Current pose
  const [pose, setPose] = useState<PosePayload|undefined>(); 

  // Component content
  return (
    <>
        <div className={styles.ui_wrapper}>
          <div className={styles.controls}>
            <Controls />
          </div>
          <div className='map'>
            <Map pose={pose} setPose={setPose}/>
          </div>
        </div>
    </>
  );
};


export default UiWrapper;
