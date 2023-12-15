const url = 'https://referential.p.rapidapi.com/v1/country?fields=currency%2Ccurrency_num_code%2Ccurrency_code%2Ccontinent_code%2Ccurrency%2Ciso_a3%2Cdial_code&limit=250';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a6f3d1fffcmshfe00ea9395d581fp13ba85jsncf8248095449',
		'X-RapidAPI-Host': 'referential.p.rapidapi.com'
	}
};

let main = document.getElementById("principal");
let result2 = "";
const selectElement = document.getElementById('local');
let divContainer = document.querySelector(".cards");

var listaViagens = [];
let form = document.forms["cadastroDeViagem"];
let cardButtons;

async function fetchData() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        result2 = quickSort(result);
        console.log(result2);

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
        return
    }
    let viagem = {
        "id": listaViagens.length + 1,
        "tituloViagem": this.titulo.value,
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

    let container = document.querySelector(".cards");
    if (localStorage.length > 0) {
        listaViagens = JSON.parse(localStorage.getItem('viagens'));
    }
    
    if(listaViagens != null && listaViagens.length != 0) {
        console.log(listaViagens.length);
        criarCards(listaViagens);
        container.style.visibility = "visible";
    }else container.style.visibility = "hidden";

    cardButtons = document.querySelectorAll(".btn-delete");
    adicionarListeners(cardButtons);
})

function criarCards(listaViagensJSON) {
    let container = document.querySelector(".cards");
    
    listaViagensJSON.forEach(viagem => {
        let card = `
        <div class="card">
            <div class="card-body">
                <div class="titulo">
                    <h5 class="card-title">${viagem.tituloViagem}</h5>
                </div>
                <div>
                    <p class="card-text">Pais de destino: ${viagem.Local}.</p>
                    <p class="card-text">Cidade: ${viagem.Cidade}.</p>
                    <p class="card-text">Descrição: ${viagem.Descricao}.</p>
                    <p class="card-text">Nota da viagem: ${viagem.nota}.</p>
                </div>
                <a href="#" class="btn btn-primary btn-delete">Excluir</a>
            </div>
        </div>
        `;
        container.innerHTML += card;
    });
    console.log(main.offsetHeight);
    console.log(container.offsetHeight);
    if (main.offsetHeight < container.offsetHeight) {

        main.style.height = (container.offsetHeight+100)+"px";
        console.log("CHEGOU AQ MAS NÃO DEU DOGÃOKKKKKKKKK");
    }
}




function adicionarListeners(params) {
    for (let index = 0; index < params.length; index++) {
        console.log("TÁ ADICIONANDO LEGAL DOGÃOKKKKKKKKKKKK");
        
        params[index].addEventListener('click',() =>{

            if (confirm("Deseja mesmo deletar esta viagem?")) {
                listaViagens.splice(index, 1);
                localStorage.clear();
                localStorage.setItem('viagens',JSON.stringify(listaViagens));
                location.reload();
            }else{
                return;
            }

        });
    }
}

function quickSort(arr){
    if (arr.length <= 1) {
      return arr;
    }
  
    let pivot = arr[0];
    let leftArr = [];
    let rightArr = [];
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].value.localeCompare(pivot.value) < 0) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    }
  
    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
  };
  