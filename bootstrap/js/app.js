/**
 * Created by Alienware on 11-04-2016.
 */
window.instagram ={


    config: {},

    BASE_URL: 'https://api.instagram.com/v1',

    init: function(opt){
        opt = opt || {};

        this.config.client_id = opt.client_id;

    },

    popular: function( callback ){
        var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id;
        this.getJSON(endpoint , callback);

    },

    tagName: function( name, callback ) {
        var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?client_id=' + this.config.client_id;
        this.getJSON(endpoint , callback);
    },

    getJSON: function( url , callback){
        $.ajax({
            type:'GET',
            url: url,
            dataType: 'jsonp',
            success: function(response){
                if(typeof callback === 'function' )callback (response);

            }
        });
    }
};

instagram.init({
   client_id:'d49da08a520f47cbb6e7618f077f33ef'
});



$(document).ready( function(){


    instagram.popular(function(response){
        var $instagram = $('#instagram');

        for( var i = 0; i < response.data.length ; i++){
            imageUrl = response.data[i].images.low_resolution.url;
            $instagram.append('<img src="' + imageUrl + '"/>')
        }
    });

$('#form').on('submit',function(e){
    e.preventDefault();
    var tag = $('search').val();
    instagram.tagName(tag, function (response){
        var $instagram = $('#instagram');
        $instagram.html('');
        for( var i = 0; i < response.data.length ; i++){
            imageUrl = response.data[i].images.low_resolution.url;
            $instagram.append('<img src="' + imageUrl + '"/>');
        }

    });


});

});



