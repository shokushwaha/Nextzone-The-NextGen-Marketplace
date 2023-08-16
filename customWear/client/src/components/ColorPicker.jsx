import React from 'react'
import {SketchPicker} from 'react-color';
import state from '../store';
import { useSnapshot } from 'valtio';

const ColorPicker = () => {
  const snap= useSnapshot(state);
  return (
    <div className='absolute left-full ml-3'> 
      <SketchPicker
      color={snap.color}
      disableAlpha
      onChange={(color)=>state.color=color.hex}
      />
    </div>
  )
}

export default ColorPicker
