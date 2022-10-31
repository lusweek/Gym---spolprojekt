import React, { Component } from 'react'
import EdiText from 'react-editext'



export default class App extends Component {

  
  onSave = val => {
    console.log('Edited Value -> ', val)
  }

  render() {

    return (
      <EdiText className='text'
        viewContainerClassName='my-custom-view-wrapper'
        type="text" 
       
        inputProps={{
          rows: 5
        }}
        saveButtonContent=''
        cancelButtonContent={<strong></strong>}
        editButtonContent='Edit'
        
        onSave={this.onSave}
      />
    )
  }
}