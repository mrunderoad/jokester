import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RonSwansonService from "./js/ron-swanson-service.js";
import DadService from './js/dad-joke-service';
import ProgrammingService from "./js/programming-service";
import SimpsonsService from './js/simpsons-service';
import MemeService from './js/meme-service';
import RandomFactService from './js/random-fact-service';
import doh from './assets/audio/doh.ogg';
import zucc from './assets/audio/zucc.ogg';
import dad from './assets/audio/dad.ogg';
import ron from './assets/audio/ron.ogg';
import bruh from './assets/audio/bruh.ogg';

function ronSwan(input) {
  if (input) {
    RonSwansonService.getRonSwanSearch(input)
      .then(function(ronResponse) {
        if (ronResponse instanceof Error) {
          throw Error(`Ron Swanson API error: ${ronResponse.message}`);
        }
        let randomRon = ronResponse.length - 1;
        let ronChoice = Math.floor(Math.random() * randomRon);
        const theJoke = ronResponse[ronChoice];
        displayJoke(theJoke);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  } else {
    RonSwansonService.getRonSwanRandom()
      .then(function(ronResponse) {
        if (ronResponse instanceof Error) {
          throw Error(`Ron Swanson API error: ${ronResponse.message}`);
        }
        const theJoke = ronResponse[0];
        displayJoke(theJoke);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  }
}

function programming(input) {
  if (input) {
    ProgrammingService.getSearchJoke(input)
      .then(function(programmingResponse) {
        if(programmingResponse instanceof Error) {
          throw Error (`Programming joke API error: ${programmingResponse.message}`);
        }
        const programmingJoke = programmingResponse.joke;
        displayJoke(programmingJoke);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  } else {
    ProgrammingService.getRandomJoke()
      .then(function(programmingResponse) {
        if (programmingResponse instanceof Error) {
          throw Error(`Programming joke API error: ${programmingResponse.message}`);
        }
        const programmingJoke = programmingResponse.joke;
        displayJoke(programmingJoke);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  }
}

function dadJoke(input) {
  if (input) {
    DadService.getSearchJoke(input)
      .then(function(dadResponse) {
        if(dadResponse instanceof Error) {
          throw Error (`Dad Joke API error: ${dadResponse.message}`);
        }
        let randomDad = dadResponse.results.length - 1;
        let dadChoice = Math.floor(Math.random() * randomDad);
        const dadJoke = dadResponse.results[dadChoice].joke;
        displayJoke(dadJoke);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  } else {
    DadService.getRandomJoke()
      .then(function(dadResponse) {
        if (dadResponse instanceof Error) {
          throw Error(`Dad Joke API error: ${dadResponse.message}`);
        }
        const dadJoke = dadResponse.joke;
        displayJoke(dadJoke);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  }
}

function simpsons() {
  SimpsonsService.getSimpsonsRandom()
    .then(function(simpsonsResponse) {
      if (simpsonsResponse instanceof Error) {
        throw Error (`Simpsons quote API error: ${simpsonsResponse.message}`);
      }
      const simpsonsJoke = simpsonsResponse[0].quote;
      const simpsonsImage = simpsonsResponse[0].image;
      displayJoke(simpsonsJoke);
      displaySimpsonsImage(simpsonsImage);
    })
    .catch(function(error) {
      displayErrors(error.message);
    });
}

function meme() {
  MemeService.getMemeRandom()
    .then(function(memeResponse) {
      if (memeResponse instanceof Error) {
        throw Error (`Memes API error: ${memeResponse.message}`);
      }
      const memeJoke = memeResponse.preview[1];
      displayMemeImage(memeJoke);
    })
    .catch(function(error) {
      displayErrors(error.message);
    });
}

function randomFact() {
  RandomFactService.getRandomFact()
    .then(function(randomFactResponse) {
      if (randomFactResponse instanceof Error) {
        throw Error (`Random Fact API error: ${randomFactResponse.message}`);
      }
      const randomFact = randomFactResponse.text;
      displayRandomFact(randomFact);
    })
    .catch(function(error) {
      displayErrors(error.message);
    });
}

function displayJoke(joke) {
  $('.result').text(joke);
}

function displayRandomFact(fact) {
  $('.randomFact').text(fact);
}

function displayErrors(error) {
  $('.error').text(error);
}

function displaySimpsonsImage(img) {
  $('.simpsonImg').html(`<img src=${img} class='simp'>`);
}

function displayMemeImage(img) {
  $('.memeImg').html(`<img src=${img} class='meme'>`);
}

function clearAllFields() {
  $('input').val('');
  $('.result').text('');
  $('.simpsonImg').html('');
  $('.error').text('');
  $('.memeImg').html('');
  $('.randomFact').text('');
}

$(document).ready(function() {
  let playDoh = new Audio();
  playDoh.src = doh;
  let playZucc = new Audio();
  playZucc.src = zucc;
  let playDad = new Audio();
  playDad.src = dad;
  let playRon = new Audio();
  playRon.src = ron;
  let playBruh = new Audio();
  playBruh.src = bruh;
  $('form').submit(function(event) {
    event.preventDefault();
    clearAllFields();
  });
  $('#memebtn').click(function() {
    let memeInput = $('#meme').val();
    meme(memeInput);
    playBruh.play();
  });
  $('#probtn').click(function() {
    let progInput = $('#prog').val();
    programming(progInput);
    playZucc.play();
  });
  $('#probtn2').click(function() {
    programming('');
    playZucc.play();
  });
  $('#dadbtn').click(function() {
    let dadInput = $('#dad').val();
    dadJoke(dadInput);
    playDad.play();
  });
  $('#dadbtn2').click(function() {
    dadJoke('');
    playDad.play();
  });
  $('#ronbtn').click(function() {
    let ronInput = $('#rons').val();
    ronSwan(ronInput);
    playRon.play();
  });
  $('#ronbtn2').click(function() {
    ronSwan('');
    playRon.play();
  });
  $('#simpbtn').click(function() {
    simpsons('');
    playDoh.play();
  });
  $('#factbtn').click(function() {
    clearAllFields();
    randomFact('');
    $('.bubble').show();
  });
  $('label').click(function(){
    clearAllFields();
  });
  $('#page-2').click(function(){
    $('.pg-2').hide();
    $('.pg-1').show();
    $('body').addClass('interior');
  });
  $('.beer').click(function(){
    $('#shotsbtn').hide();
    $('#winebtn').hide();
    $('#martinibtn').hide();
    $('#beerbtn').show();
    $('#sodabtn').hide();
  });
  $('.martini').click(function(){
    $('#shotsbtn').hide();
    $('#winebtn').hide();
    $('#martinibtn').show();
    $('#beerbtn').hide();
    $('#sodabtn').hide();
  });
  $('.wine').click(function(){
    $('#shotsbtn').hide();
    $('#winebtn').show();
    $('#martinibtn').hide();
    $('#beerbtn').hide();
    $('#sodabtn').hide();
  });
  $('.soda').click(function(){
    $('#shotsbtn').hide();
    $('#winebtn').hide();
    $('#martinibtn').hide();
    $('#beerbtn').hide();
    $('#sodabtn').show();
  });
  $('.shots').click(function(){
    $('#shotsbtn').show();
    $('#winebtn').hide();
    $('#martinibtn').hide();
    $('#beerbtn').hide();
    $('#sodabtn').hide();
  });
});    


