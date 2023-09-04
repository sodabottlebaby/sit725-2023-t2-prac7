// Here we are going to add cards to the homepage. This is done using an item object
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
            '</div><div class="card-content">'+
            '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.subTitle+'</a></p></div>'+
            '<div class="card-reveal">'+'<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
            '<p class="card-text">'+item.description+'</p>'+
            '</div></div></div>';
        $("#card-section").append(itemToAppend);
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log("Form Data Submitted: ", formData);
    postCat(formData);
}

function postCat(cat) {
    $.ajax({
        url:'/api/cat',
        type:'POST',
        data:cat,
        success:  (result) => {
            if (result.statusCode === 201) {
                alert('Cat post successful');
            }
        },
        error: (err) => {
            console.log("Error: ", err);
        }
    });
}

function getAllCats(){
    $.get('/api/cat', (response)=>{
        //response's data is in array format
        if (response.statusCode === 200) {
            console.log(response.data)
            addCards(response.data);
        }
    });
}

let socket = io();
socket.on('number', (msg) => {
    console.log('Random Number: ' + msg);
});

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllCats();
    console.log("Ready");
});