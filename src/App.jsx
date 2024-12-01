import React, { PureComponent } from 'react'
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
import ResultDisplay from './ResultDisplay';

export default class App extends PureComponent {

  constructor(props) {
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
      revealedImages: [],
      matchedImages: [],
      isCheckingPair: false,
      timerInterval: 0,
      moves: 0,
      winner: null,

    };
  }



  shuffleimages = () => {
    const shuffledImages = [...this.state.images].sort(() => 0.5 - Math.random());
    const selectedImages = shuffledImages.slice(0, 8).concat(shuffledImages.slice(0, 8)); // Select first 8
    const shuffledSelectedImages = selectedImages.sort(() => 0.5 - Math.random());
    console.log(shuffledSelectedImages);

    this.setState({ selectedImages: shuffledSelectedImages });
  }

  starttime = () => {
    // Timer logic
    // Start the timer
    this.timerInterval = setInterval(() => {
      this.setState(prevState => ({ timerInterval: prevState.timerInterval + 1 }));
    }, 660);
  }

  componentDidMount() {
    this.shuffleimages();
    this.starttime();
  }
  //..............
  componentDidUpdate(prevProps, prevState) {
    // Stop the timer when the winner is declared
    if (!prevState.winner && this.state.winner) {
      clearInterval(this.timerInterval); // Stop the timer

    }
  }

  componentWillUnmount() {
    // Clear the timer to prevent memory leaks
    clearInterval(this.timerInterval);
  }

  //button click works here

  handleClick = (image, index) => {

    const { revealedImages, matchedImages, moves, isCheckingPair } = this.state;

    if (moves === 32) {
      this.setState({
        winner: " You lost the game! Try again. "
      })
      return
    }

    // // Prevent clicks on the same card or on already matched cards

    if (isCheckingPair || revealedImages.some((rev) => rev.index === index) || matchedImages.includes(image)) {
      return;
    }

    this.setState((prevState) => ({
      moves: prevState.moves + 1, // Increment the moves count
    }));







    // Add the clicked card to revealedImages
    const updatedRevealedImages = [...revealedImages, { image, index }];
    this.setState({ revealedImages: updatedRevealedImages });
    
    
    // Check if two cards are now revealed
    if (updatedRevealedImages.length === 2) {
      const [first, second] = updatedRevealedImages;

      if (first.image === second.image) {
        // Cards match: keep them revealed by adding to matchedImages

        this.setState((prevState) => {
          const updatedMatchedImages = [...prevState.matchedImages, first.image];

          // Check if the game is over
          const isGameOver = updatedMatchedImages.length === prevState.selectedImages.length / 2;

          return {
            matchedImages: updatedMatchedImages,
            revealedImages: [], // Clear revealedImages for the next attempt 
            winner: isGameOver ? 'Congratulations! You won the game!' : null, // Set winner message
          };
        });
      } else {
        // Cards do not match: reset revealedImages after a delay
        setTimeout(() => {
          this.setState({
            revealedImages: [] // Hide unmatched cards by resetting revealedImages
          });
        }, 500); // Adjust delay as needed
      }
    }
  };


  restart = () => {
    this.setState({
      // selectedImages: [],
      revealedImages: [],
      matchedImages: [],
      isCheckingPair: false,
      timerInterval: 0,
      moves: 0,
      winner: null,
    })
    this.starttime()
    this.shuffleimages()
  }
  
// card is here
  renderCard = (image, index) => {
    const { revealedImages, matchedImages, Blankimage } = this.state;

    const isRevealed = revealedImages.some(rev => rev.index === index);
    const isMatched = matchedImages.includes(image);

    return (
      <Card
        style={{
          width: '100px',
          height: '100px',
          perspective: '1000px', // Add perspective for the 3D flip effect
        }}
        className={` ${styles.cardBox} m-2 bg-warning border-0`}
        key={index}
      >
        <div
          className={`d-flex justify-content-center align-items-center ${styles.card} ${isRevealed || isMatched ? styles.flipped : ''}`}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d', // Enables 3D transform
            transition: 'transform 0.5s', // Smooth animation
          }}
          onClick={() => this.handleClick(image, index)}
        >
          {/* Front Face (Question Mark) */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
          >
            <img
              src={Blankimage}
              alt="Question Mark"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '7px',
              }}
            />
          </div>

          {/* Back Face (Revealed Image) */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden', // Hides front face when flipped
              transform: 'rotateY(180deg)', // Rotates the back face
            }}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '7px',
              }}
            />
          </div>
        </div>
      </Card>


    );
  };



  render() {
    const { winner, moves, timerInterval } = this.state;
    return winner ? (
      <ResultDisplay
        gamestatus={winner}
        moves={moves}
        timerInterval={timerInterval}
        restart={this.restart} />
    ) : (
      <div className={`${styles.body}  d-flex flex-column justify-content-center align-items-center vw-100 vh-100`}>
        <div className={` ${styles.mainContainer} d-flex flex-column bg-warning rounded`} >
          <div className={`${styles.status_container} `}>
            <div className={`${styles.count_status} d-flex justify-content-between`}> <div className='d-flex'>
              <h6>Moves : </h6> {moves}
            </div>
              <div>
                <h6>Max-move:32</h6>
              </div>
            </div>
            <div className={`${styles.timer} d-flex`}> <h6>Timer :</h6> {Math.floor(this.state.timerInterval / 60)}m {this.state.timerInterval % 60}s </div>

          </div>
          <div className={`${styles.boxes} d-flex `}>
            <div className={`${styles.box_row} d-flex flex-wrap`}>
              {
                this.state.selectedImages.map((image, index) => this.renderCard(image, index))
              }
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button className={`${styles.restartBtn} rounded border-0 p-1 pe-2 ps-2`} onClick={this.restart}>Restart Game</button>
          </div>
        </div>

      </div>
    );
  }
}
