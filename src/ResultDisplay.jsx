import React, { Component } from 'react'
import Styles from './ResultDisplay.module.css'

export default class ResultDisplay extends Component {
  render() {
    const {timerInterval} = this.props
    return (
      <div className='d-flex justify-content-center align-items-center bg-warning vw-100 vh-100'>
       <div className={`${Styles.resultContainer } d-flex  flex-column  justify-content-center align-items-center rounded`}>
       <div className={Styles.gameStatus}>
        <h2>{this.props.gamestatus}</h2>
       </div>
       <div className={Styles.cound}>
        <h4>Time taken :{Math.floor(timerInterval / 60)}m {timerInterval % 60}s</h4>
       </div>
       <div className={Styles.cound}>
        <h4>Moves : {this.props.moves}</h4>
       </div>
       
       <div>
        <button onClick={this.props.restart} className={` border-2 rounded pt-2 ps-2 pe-2 `}> <h6>Restart</h6></button>
       </div>
       
       </div>
      </div>
    )
  }
}
