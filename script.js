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

