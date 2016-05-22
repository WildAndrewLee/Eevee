$(function(){
    // Dragonite
    // new Pokemon(149);
    // Unown
    // new Pokemon(201);

    // Dewgong
    API.prepare().then(function(){
        var dewgong = new Pokemon(386);
        dewgong.load().then(function(){
            $('body').append(dewgong.render());
            window.dewgong = dewgong;
        });
    });
});
