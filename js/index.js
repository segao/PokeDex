var num = 1;
function reset() {
 $('.pokenum').empty();
 $('.sprite').empty();
 $('.name').empty();
 $('.height').empty();
 $('.weight').empty();
 $('.types').empty();
 $('.moves').empty();
 $('.movetype').empty();
 $('.abilities').empty();
 $('.hp').empty();
 $('.attack').empty();
 $('.defense').empty();
 $('.spatk').empty();
 $('.spdef').empty();
 $('.speed').empty();
 $('.description').empty();
}
function getPokemon() {
  $.getJSON('http://pokeapi.co/api/v2/pokemon/' + num + '/', function(data) {
    if (data.id < 100) {
      if (data.id < 10) {
        $('.pokenum').append("#00" + data.id);
        $('.sprite').append("<img src = http://www.serebii.net/sunmoon/pokemon/00" + data.id + ".png>");
      }
      else {
        $('.pokenum').append("#0" + data.id);
        $('.sprite').append("<img src = http://www.serebii.net/sunmoon/pokemon/0" + data.id + ".png>");
      }
    }
    else {
      $('.pokenum').append("#" + data.id);
      $('.sprite').append("<img src = http://www.serebii.net/sunmoon/pokemon/" + data.id + ".png>");
    }
    for (var i = 0; i < data.types.length; i++) {
      $('.types').append("<li class=\"" + data.types[i].type.name + "\">" + data.types[i].type.name + "</li> ");
    }
    for (var i = 0; i < data.moves.length; i++) {
      $('.moves').append("<li>" + data.moves[i].move.name + "</li>");
      $.getJSON(data.moves[i].move.url, function(data) {
        $('.movetype').append("<li class=\"type " + data.type.name + "\">" +  data.type.name+ "</li>");
      });
    }
    for (var i = 0; i < data.abilities.length; i++) {
      $('.abilities').append("<li>" + data.abilities[i].ability.name + "</li>");
    }
  });
}
function getDescription() {
  $.getJSON('http://pokeapi.co/api/v1/pokemon/' + num + '/', function(data) {
    $('.name').append(data.name);
    $('.height').append(data.height + "m");
    $('.weight').append(data.weight + "kg");
    $('.hp').append("HP: " + data.hp);
    $('.attack').append("Attack: " + data.attack);
    $('.defense').append("Defense: " + data.defense);
    $('.spatk').append("Sp. Attack: " + data.sp_atk);
    $('.spdef').append("Sp. Defense: " + data.sp_def);
    $('.speed').append("Speed: " + data.speed);
    var uri = data.descriptions[27].resource_uri;
    $.getJSON('http://pokeapi.co' + uri, function(data) {
      $('.description').append(data.description);
    });
  });
}

getPokemon();
getDescription();

$('.find').on("click", function() {
  reset();
  num = $(this).parent().attr('value');
  getPokemon();
  getDescription()
});
