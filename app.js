var clicks = 0;
var coin = 0;
var monster_health = 10;
var click_dmg = 1; // Index for damage per click

// First weapon stats
var weapon_1_cost = 3;
var weapon_1_lvl = 0;
var weapon_first_dmg = 1;
var click_dmg_1 = 0;

// Second weapon stats
var weapon_2_cost = 6;
var weapon_2_lvl = 0;
var weapon_2_dmg = 2;
var click_dmg_2 = 0;

// Third weapon stats
var weapon_3_cost = 9;
var weapon_3_lvl = 0;
var weapon_3_dmg = 3;
var click_dmg_3 = 0;

// Defining weapon buttons
const weapon_first_btn = document.getElementById('weapon_first_btn');
const weapon_second_btn = document.getElementById('weapon_second_btn');
const weapon_third_btn = document.getElementById('weapon_third_btn');

// Defining monster sprites with id's and class
const monster_1 = document.getElementById('monster_1');
const monster_2 = document.getElementById('monster_2');
const monster_3 = document.getElementById('monster_3');
var monsters = $('.monster');

const health_bar = $('#monster_health');


/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function monster_click() {
    health_bar.removeClass('w-' + monster_health * 10);
    monster_health -= click_dmg;
    health_bar.addClass('w-' + monster_health * 10);

}

// Counts clicks
function clickEvent() {
    update_coins(); //updates the text 
    monster_click();

    if (monster_health <= 0) {
            coin += 1;
            document.getElementById("coin_counter").innerHTML = coin;

            health_bar.removeClass('w-0');
            health_bar.addClass('w-100');

            monster_health = 10
            monsters.addClass("d-none");
            var random = shuffle(monsters).slice(0, 1); // Using Fisher-Yates shuffle algorithm to choose random monster
            
            setTimeout(() => {
                random.removeClass("d-none");
            }, 200);
            update_coins(); //Call to check if coins are enough when monster health is at 0
    }
}

function update_coins() {
    if (coin >= weapon_1_cost) {
        weapon_first_btn.disabled = false;
    }
    if (coin >= weapon_2_cost) {
        weapon_second_btn.disabled = false;
    }
    if (coin >= weapon_3_cost) {

        weapon_third_btn.disabled = false;
    }
}

// First weapon button logic
function upgradeFirstWeapon() {
    coin -= weapon_1_cost;
    click_dmg_1 += 1;
    click_dmg += click_dmg_1;
    weapon_1_cost = Math.floor(weapon_1_cost * 1.5);
    weapon_1_lvl += 1;

    document.getElementById("coin_counter").innerHTML = coin;
    document.getElementById("weapon_first_lvl").innerHTML = weapon_1_lvl;
    document.getElementById("weapon_first_price").innerHTML = weapon_1_cost;

    // Index for damage per click
    document.getElementById('click_dmg').innerHTML = click_dmg;
    
    if (coin < weapon_1_cost) {
        weapon_first_btn.disabled = true;
    }
}

// Second weapon button logic
function upgradeSecondWeapon() {
    coin -= weapon_2_cost;
    click_dmg_2 += 2;
    click_dmg += click_dmg_2;
    weapon_2_cost = Math.floor(weapon_2_cost * 1.5);
    weapon_2_lvl += 1;

    // Disable first weapon button so user can't purchase it anymore
    weapon_first_btn.disabled = true;

    document.getElementById("coin_counter").innerHTML = coin;
    document.getElementById("weapon_second_lvl").innerHTML = weapon_2_lvl;
    document.getElementById("weapon_second_price").innerHTML = weapon_2_cost;
    
    // Index for damage per click
    document.getElementById('click_dmg').innerHTML = click_dmg;

    if (coin < weapon_2_cost) {
        weapon_second_btn.disabled = true;
    }
}

// Third weapon button logic
function upgradeThirdWeapon() {
    coin -= weapon_3_cost;
    click_dmg_3 += 3;
    click_dmg += click_dmg_3;
    weapon_3_cost = Math.floor(weapon_3_cost * 1.5);
    weapon_3_lvl += 1;

    // Disable second weapon button so user can't purchase it anymore
    weapon_second_btn.disabled = true;

    document.getElementById("coin_counter").innerHTML = coin;
    document.getElementById("weapon_third_lvl").innerHTML = weapon_3_lvl;
    document.getElementById("weapon_third_price").innerHTML = weapon_3_cost;
    
    // Index for damage per click
    document.getElementById('click_dmg').innerHTML = click_dmg;

    if (coin < weapon_3_cost) {
        weapon_third_btn.disabled = true;
    }
}