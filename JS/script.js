$body = document.querySelector('body');
$game_board = document.querySelector('.game-board');
$score = document.querySelector('.provision-pounds');
$damage = document.querySelector('.damage-amount');
$damage_bar = document.querySelector('.damage');
$explosion_sound = document.querySelector('#explosion');
$collect_sound = document.querySelector('#collected');
$game_sound = document.querySelector('#music');
$game_sound.play();

const create_game_grid = () => {
    let i = 0;
    while(i < 36){
        let cell = document.createElement('div');
        cell.classList.add('grid-square');
        $game_board.append(cell);
        i++;
    }
}

create_game_grid();

const $player_position = {x:0, y:3};
let $player;
const create_player = () => {
    $player = document.createElement('img');
    $player.src = '../Assets/Images/spacecraft.png';
    $player.classList.add('player');
    $player.style.transform = 'rotate(90deg)';
    $player.style.top = `${$player_position.y * 125}px`;
    $game_board.append($player);
}

create_player();

const move_player = () => {
    $player.style.top = `${$player_position.y * 125}px`;
    $player.style.left = `${$player_position.x * 125.64}px`;
}

const get_key = (e) => {
    let code = e.keyCode;
    if([37,38,39,40].includes(code)){
        e.preventDefault();
        switch(code){
            case 37:
                return 'left'
            break;

            case 38:
                return 'up';
            break;

            case 39:
                return 'right';
            break;

            case 40:
                return 'down';
            break;
        }
    }
}

const key_pressed = (e) => {
    let which_key = get_key(e);
    if(which_key === 'up'){
        $player.style.transform = 'rotate(0deg)';
        
        if($player_position.y >= 1){
            $player_position.y--;
        }
    }
    else if(which_key === 'down'){
        $player.style.transform = 'rotate(0deg)';
        $player.style.transform = 'rotate(180deg)';
        
        if($player_position.y <= 4){
        $player_position.y++; 
        }
    }
    else if(which_key === 'left'){
        $player.style.transform = 'rotate(0deg)';
        $player.style.transform = 'rotate(270deg)';
        
        if($player_position.x >= 1){
        $player_position.x--;
        }    
    }
    else if(which_key === 'right'){
        $player.style.transform = 'rotate(0deg)';
        $player.style.transform = 'rotate(90deg)';

        if($player_position.x <= 4){
            $player_position.x++;
        }
    }
    move_player();
    collision_detection();
}

document.addEventListener('keydown', key_pressed);

item_array = [];
let item_array_index = 0;
let is_first_item_set = true;
let item_generator;
let item_mover;
let item_filepath = '../Assets/Images/';
let reward_array = ['berry.png', 'grapes.png', 'strawberry.png', 'blueberry.png'];
let images; 
let remove_item;
let leading_item_set = 0;
let current_score = 0;
let damage_percentage = 0;
let new_width;
let images_index = 0;

const win_or_lose = (scre, damge) => {
    if(scre >= 1000 || damge >= 100){
        clearInterval(item_mover);
        clearInterval(item_generator);
        if(scre >= 1000){
            setTimeout(function() { 
                alert("You Won!!");
                document.location.reload(); 
        }, 500);
        }
        else{
            setTimeout(function() { 
                alert("You Lost!!");
                document.location.reload(); 
            }, 500);
        }
        
    }
}

const update_game_info = () => {
    $score.innerText = ` ${current_score} lbs`;
    $damage.innerHTML = `${damage_percentage}%`;

    new_width = damage_percentage * 4;
    $damage_bar.style.width = `${new_width}px`;

    if(new_width >= 200 && new_width < 300){
        $damage_bar.style.background = 'orange';
    }
    else if(new_width >= 300){
        $damage_bar.style.background = 'red';
    }

    win_or_lose(current_score, damage_percentage);

}

const collision_detection = () => {
    for(item_set of item_array) {
        for (item of item_set) {
            if($player_position.x === item.x && $player_position.y === item.y){
                if(item.elmnt.style.display !== 'none'){
                    if(item.type === 'reward'){
                        item.elmnt.style.display = 'none';
                        $collect_sound.play();
                        images = document.querySelectorAll('.item');
                        current_score += 50;
                    }
                    else{
                        item.elmnt.style.transform = 'rotate(0deg)';
                        item.elmnt.src = '../Assets/GIFS/exploding4.gif';
                        $explosion_sound.play();
                        setTimeout(function(){$explosion_sound.load();},300);
                        remove_item = item;
                        setTimeout(function(){remove_item.elmnt.style.display = 'none';}, 175);
                        images = document.querySelectorAll('.item');
                        damage_percentage += 10;
                    }
                    update_game_info();
                }
            }
        }
    }
}

const remove_item_set = () => {
    let count = 0;
    while(count < 3){
        images[images_index++].style.display = 'none';
        count++;
    }
    leading_item_set++;
}

const move_items = () => {
  if (item_array[leading_item_set][0].x === 0) {
    remove_item_set();
  } else {
    let index = 0;
    for (item_set of item_array) {
      for (item of item_set) {
        images[index].style.left = `${--item.x * 125.64}px`;
        index++;
      }
    }
  }
  collision_detection();
}

const display_items = () => {
  for (item of item_array[item_array_index]) {
    let image = document.createElement('img');
    image.classList.add('item');
    image.src = item.source;
    image.style.left = `${item.x * 125.64}px`;
    image.style.top = `${item.y * 125}px`;
    item.elmnt = image;
    $game_board.append(image);
  }
  item_array_index++;
  if (is_first_item_set) {
    item_mover = setInterval(move_items, 375);
    item_generator = setInterval(generate_random_items, 1000);
    is_first_item_set = false;
  }
    images = document.querySelectorAll('.item');
};

const set_item_sources = () => {
    let reward_array_index = Math.floor(Math.random() * reward_array.length);
    let reward_source = item_filepath + reward_array[reward_array_index];
    for (item of item_array[item_array_index]) {
        if (item.type === 'reward') {
            item.source = reward_source;
        }
        else {
            item.source = '../Assets/GIFS/meteor.gif';
        }
    }
    display_items();
}

const set_item_types = () => {
    let reward_index = Math.floor(Math.random() * item_array[item_array_index].length);
    for (index in item_array[item_array_index]){
        if(index == reward_index){
            item_array[item_array_index][index].type = 'reward';
        }
        else{
            item_array[item_array_index][index].type = 'obstacle';
        }
    }
    set_item_sources();
}

const generate_random_items = () => {
    let items_y_coordinates = [];
    let new_item_set = [];
    let count = 0;
    while (count < 3) {
        let coordinate = Math.floor(Math.random() * 6);
        while (items_y_coordinates.includes(coordinate)) {
            coordinate = Math.floor(Math.random() * 6);
        }
        items_y_coordinates.push(coordinate);
        new_item_set.push({ x: 5, y: coordinate });
        count++;
    }
    item_array.push(new_item_set);
    set_item_types();
}

generate_random_items();
