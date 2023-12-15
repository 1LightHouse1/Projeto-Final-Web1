const url = 'https://referential.p.rapidapi.com/v1/country?fields=currency%2Ccurrency_num_code%2Ccurrency_code%2Ccontinent_code%2Ccurrency%2Ciso_a3%2Cdial_code&limit=250';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'chave',
		'X-RapidAPI-Host': 'referential.p.rapidapi.com'
	}
};

let result2 = "";
const selectElement = document.getElementById('local');
let divContainer = document.querySelector(".cards");

var listaViagens = [];
let form = document.forms["cadastroDeViagem"];

async function fetchData() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        result2 = result;
        console.log(result);

        updateSelect();
    } catch (error) {
        console.error(error);
    }
}

function updateSelect() {
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Selecione um país';
    selectElement.add(defaultOption, 0);

    result2.forEach(country => {
        const option = document.createElement('option');
        option.text = country.value;
        selectElement.add(option);
    });
}

fetchData();

document.getElementById('show-form-btn').addEventListener('click', function() {
    document.getElementById('form-container').classList.add('d-block');
    document.getElementById('overlay').style.display = 'block';
});

document.getElementById('close-form-btn').addEventListener('click', function(){
    document.getElementById('form-container').classList.add('none');
    document.getElementById('overlay').style.display = 'none';
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (this.local.value === "Selecione um país") {
        window.alert("SELECIONE ALGUM PAÍS");
    }
    let viagem = {
        "id": listaViagens.length + 1,
        "Local": this.local.value,
        "Cidade": this.cidade.value,
        "Descricao": this.descricao.value,
        "nota": this.nota.value,
    };
    listaViagens.push(viagem)
    
    localStorage.setItem('viagens',JSON.stringify(listaViagens));
    location.reload();
});

window.addEventListener('load', () =>{
    listaViagens = JSON.parse(localStorage.getItem('viagens'));

    if(listaViagens!= null){
        criarCards(listaViagens);
    }
})

function criarCards(listaViagensJSON) {
    let container = document.querySelector(".cards");
    listaViagensJSON.forEach(viagem => {
        let card = `
        <div class="card-body">
            <h5 class="card-title">${viagem.Local}</h5>
            <p class="card-text">${viagem.Cidade}</p>
            <p class="card-text">${viagem.Descricao}</p>
            <p class="card-text">${viagem.nota}</p>
        </div>
        <div class="card-footer">
            <a href="#" class="btn btn-primary">Editar</a>
            <a href="#" class="btn btn-danger">Excluir</a>
        </div>
        `;
        container.innerHTML += card;
    });
}

function deletarCard(){
    
}



