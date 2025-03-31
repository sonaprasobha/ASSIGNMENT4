/*
  Name: sona bijumon prasobha
  File: story.js
  Date: 25-03-2025
  Description: JavaScript logic for Silly Story Generator
*/

// 1. VARIABLE DEFINITIONS
var customName = document.getElementById("customname");
var randomize = document.querySelector(".randomize");
var story = document.querySelector(".story");

// 2. TEXT STRINGS
var storyText = "It was :temperature: outside, so :character: went for a walk. When they got to :place:, they stared in horror for a few moments, then :action:. Bob saw the whole thing, but was not surprised — :character: weighs :weight:.";

var characters = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
var places = ["the soup kitchen", "Disneyland", "the White House"];
var actions = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and crawled away",
];

// 3. EVENT LISTENER AND FUNCTION
randomize.addEventListener("click", result);

function result() {
  var newStory = storyText;

  // Randomly select items from arrays
  var character = randomValueFromArray(characters);
  var place = randomValueFromArray(places);
  var action = randomValueFromArray(actions);
  var weight = "300 pounds"; // Default weight
  var temperature = "94 fahrenheit"; // Default temperature

  // Replace placeholders in the story
  newStory = newStory.replace(/:character:/g, character);
  newStory = newStory.replace(":place:", place);
  newStory = newStory.replace(":action:", action);
  newStory = newStory.replace(":weight:", weight);
  newStory = newStory.replace(":temperature:", temperature);

  // Custom name replacement
  if (customName.value !== "") {
    newStory = newStory.replace("Bob", customName.value);
  }

  // UK conversion
  if (document.getElementById("uk").checked) {
    weight = Math.round(300 / 14) + " stone";
    temperature = Math.round((94 - 32) * 5 / 9) + " centigrade";
    newStory = newStory.replace(":weight:", weight);
    newStory = newStory.replace(":temperature:", temperature);
  }

  // Display the story
  story.textContent = newStory;
  story.style.visibility = "visible";
}

// Helper function to get a random value from an array
function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}