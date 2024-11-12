import React, { Component, PureComponent } from 'react'
import styles from './Styles.module.css'
import img1 from './assets/img1.jpeg';
import img2 from './assets/img2.jpeg';
import img3 from './assets/img3.jpeg';
import img4 from './assets/img4.jpeg';
import img5 from './assets/img5.jpeg';
import img6 from './assets/img6.jpeg';
import img7 from './assets/img7.jpeg';
import img8 from './assets/img8.jpeg';
import img9 from './assets/img9.jpg';
import img10 from './assets/img10.jpg';
import img11 from './assets/img11.jpg';
import img12 from './assets/img12.jpg';
import img13 from './assets/img13.jpg';
import img14 from './assets/img14.jpg';
import img15 from './assets/img15.jpg';
import img16 from './assets/img16.jpg';
import imgquemark from './assets/img-quemark.jpeg';
import { Card } from 'react-bootstrap';

export default class App extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      images: [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15,
      img16,
     ],
     Blankimage: imgquemark,
     selectedImages: [],
    };
  }


  componentDidMount() {
    const shuffledImages = [...this.state.images].sort(() => 0.5 - Math.random());
    const selectedImages = shuffledImages.slice(0,8).concat(shuffledImages.slice(0,8)); // Select first 8
    const shuffledSelectedImages = selectedImages.sort(() => 0.5 - Math.random());
    console.log(shuffledSelectedImages);
    
    this.setState({ selectedImages: shuffledSelectedImages });
  
  }
  
  
  renderSquare = ()=>{
   
    return <Card style={{width:'100px' , height:'100px'}} className={`bg-warning m-3`} >
      {this.state.selectedImages.map((image, index) =>(
        <img src={image}key={index} alt={`Image ${index}`} />
      ))}
    </Card>

  }

  render() {
    return (
      <div className={`${styles.body} d-flex justify-content-center align-items-center bg-light vw-100 vh-100 `}>
      <Card className={` d-flex flex-column bg-warning`}>
        <div className={`${styles.status_container} border border-dark`}>
            <div className={styles.count_status}>Moves</div>
            <div className={styles.timer}>Timer</div>
        </div>   
       <div className={`${styles.boxes} d-flex flex-column`}>
        <div className={`${styles.box_row} d-flex  mw-100 mh-100 `}>
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
       
        </div>
        <div className={`${styles.box_row} d-flex`}>
       {this.renderSquare()}
       {this.renderSquare()}
       {this.renderSquare()}
       {this.renderSquare()}

        </div>
        <div className={`${styles.box_row} d-flex`}>
       {this.renderSquare()}
       {this.renderSquare()}
       {this.renderSquare()}
       {this.renderSquare()}

        </div>
        <div className={`${styles.box_row} d-flex`}>
       {this.renderSquare()}
       {this.renderSquare()}
       {this.renderSquare()}
       {this.renderSquare()}

        </div>
       </div>
       </Card>
    </div>
    )
  }
}
