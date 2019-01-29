import React from 'react';
import ImageGallery from 'react-image-gallery';


import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";

import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";


import '../../../node_modules/react-image-gallery/styles/scss/image-gallery-no-icon.scss'
import '../../../node_modules/react-image-gallery/styles/css/image-gallery-no-icon.css'

class Gallery extends React.Component {

  constructor() {
    super();
    this.state = {
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: false,
      showFullscreenButton: false,
      showGalleryFullscreenButton: false,
      showPlayButton: false,
      showGalleryPlayButton: false,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      thumbnailPosition: 'bottom',
      showVideo: {},
    };

    this.images = [
      {
        original:'https://d2ufgeaw4jqnhm.cloudfront.net/p/levis-0016-349352-1-zoom2.jpg',
        thumbnail:'https://d2ufgeaw4jqnhm.cloudfront.net/p/levis-0016-349352-1-cart.jpg',
        //size:'100',

      },  
      {
        original:'https://d2ufgeaw4jqnhm.cloudfront.net/p/levis-0019-349352-2-zoom2.jpg',
        thumbnail:'https://d2ufgeaw4jqnhm.cloudfront.net/p/levis-0019-349352-2-cart.jpg',
       // media : '(max-width: 300px)'
      },
      {
        original:'https://d2ufgeaw4jqnhm.cloudfront.net/p/levis-0016-349352-3-zoom2.jpg',
        thumbnail:'https://d2ufgeaw4jqnhm.cloudfront.net/p/levis-0016-349352-3-cart.jpg',
      //  media : '(max-width: 300px)'
      },
      {
        original:'https://d2ufgeaw4jqnhm.cloudfront.net/p/levis-0016-349352-3-zoom2.jpg',
        thumbnail:'https://d2ufgeaw4jqnhm.cloudfront.net/p/levis-0016-349352-3-cart.jpg',
      //  media : '(max-width: 300px)'
      },
      {
        original:'https://d2ufgeaw4jqnhm.cloudfront.net/p/levis-0016-349352-4-zoom2.jpg',
        thumbnail:'https://d2ufgeaw4jqnhm.cloudfront.net/p/levis-0016-349352-4-cart.jpg',
      //  media : '(max-width: 300px)'
      },
    ]

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval ||
        this.state.slideDuration !== prevState.slideDuration) {
      // refresh setInterval
      this._imageGallery.pause();
      this._imageGallery.play();
    }
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    console.debug('slid to index', index);
  }


  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }


  _handleInputChange(state, event) {
    this.setState({[state]: event.target.value});
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked});
  }

  _handleThumbnailPositionChange(event) {
    this.setState({thumbnailPosition: event.target.value});
  }

  render() {
    return (
        <ImageGallery
          //ref={i => this._imageGallery = i}
          items={this.images}
          //sizes={200}
          //lazyLoad={false}
          //onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
 
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}

          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          thumbnailPosition={this.state.thumbnailPosition}
          slideDuration={parseInt(this.state.slideDuration)}
          slideInterval={parseInt(this.state.slideInterval)}
          additionalClass="app-image-gallery"
        />

    );
  }
}

export default Gallery