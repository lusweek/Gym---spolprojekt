import React from 'react'
import { buttons } from "./data";
export default function StaffBtn(props) {
  return (
    <>
    {buttons &&
        buttons.map((type, index) => (
          <>
            <button className='StaffBtn'
              key={index}
              value={type.value}
              onClick={props.handleTrainer}
              style={{
                backgroundColor:
                  props.selected === type.value ? "rgba(115, 167, 193)" : "",
              }}
            >
              {type.name}
            </button>
          </>
        ))}
        </>
  )
}
