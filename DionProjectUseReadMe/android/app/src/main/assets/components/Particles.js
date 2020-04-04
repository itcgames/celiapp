import React from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';


/**
 * Particle component
 * Displays particles to the screen
 * @param {*} props 
 */
function Particle(props) {
  var particleConfig = {
    "particles": {
      "number": {
        "value": 322,
        "density": {
          "enable": false,
          "value_area": 710.2665077774184
        }
      },
      "color": {
        "value": props.colour
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 0.48691418137553294,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 4.005992965476349,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 284.10660311096734,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }

  return (
    <Particles
      width={360}
      height={640}
      params={particleConfig}
    />
  )
}

// Takes in how may particles should be created, their speed, radius and colour
Particle.propTypes = {
  particleAmount : PropTypes.number.isRequired,
  particleSpeed : PropTypes.number.isRequired,
  particleRadius : PropTypes.number.isRequired,
  colour: PropTypes.object.isRequired
};

export default Particle;
