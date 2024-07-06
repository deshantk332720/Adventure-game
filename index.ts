#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;



let heroHealth = 100;
let attackDamageToEnemy = 50;
let numberOfHeals = 3;
let healValue = 30;
let healthPotionDropChance = 50;


let gameRunning = true;
console.log(chalk.bgBlue.bold("\n\tWelcome to the DeadZone!\t"));

Game: while (gameRunning) {
  let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
  let enemyIndex = Math.floor(Math.random() * enemies.length);
  let enemy = enemies[enemyIndex];

  console.log(`{enemy} has appeared!`);

  while (enemyHealth > 0) {
    console.log(`Your health is ${heroHealth}`)
    
    console.log(`${enemy}'s health is ${enemyHealth}`)
    

    let options = await inquirer.prompt([
      {
        type: "list",
        name: "ans",
        message: "What do you want to do?",
        choices: ["1. Attack", "2. Heal", "3. Run"],
      },
    ]);

    if (options.ans === "1. Attack") {
      let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
      let damageToHero = Math.floor(
        Math.random() * enemyAttackDamageToHero + 1
      );
      enemyHealth -= damageToEnemy;
      heroHealth -= damageToHero;
      console.log(`You strike the ${enemy} for ${damageToEnemy}`)
      
      console.log(`${enemy} strike you for ${damageToHero} damage`)
      

      if (heroHealth < 1) {
        console.log(`You have taken too much damage. You are to weak to continue.`);
        break;
      }
    } else if (options.ans === "2. Heal") {
      if (numberOfHeals > 0) {
        heroHealth += healValue;
        numberOfHeals--;
        console.log(`You heal for ${healValue}. You now have ${heroHealth} health` )
        
        console.log(`You have ${numberOfHeals} heals left.`);
      } else {
        console.log(`You have no more heals left. Defeat enemy for a chance to get heals.`);
        
      }
    } else if (options.ans === "3. Run") {
      console.log(`You run away from the ${enemy}`);
      continue Game;
    }
  }

  if (heroHealth < 1) {
    console.log(`You are out from battle. You are too weak.`);
    break;
  }

  console.log(` ${enemy} was defeated!`);
  console.log(` You have ${heroHealth} health left.`);

  let randomNumber = Math.floor(Math.random() * 100 + 1);
  if (randomNumber <= healthPotionDropChance) {
    numberOfHeals++;
    console.log(`The ${enemy} dropped a health potion! `);
    
    console.log(`Your health is ${heroHealth}`);
    console.log(`You now have ${numberOfHeals} heals.`)
    
  }

  let userOption = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "What would you like to do now.",
    choices: ["1. Continue", "2. Exit"],
  });
  if (userOption.option === "1. Continue") {
    console.log("You continue on your adventure.");
  } else {
    console.log("You exit the game." )
    break;
  }
}



