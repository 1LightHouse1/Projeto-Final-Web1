fetch(`alpha-meme-maker.herokuapp.com/`).then(resposta=>{
    console.log(resposta.json);
})

document.getElementById('show-form-btn').addEventListener('click', function() {
    document.getElementById('form-container').classList.add('d-block');
    document.getElementById('overlay').style.display = 'block';
});