// isolando as variaveis dos usuario
(function () {
       
    //criando a quarta função convertendo milisegundos em minutos
    function convertPeriod(mil){
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    //criando a terceira função
function renderGaragem(){
    const garagem = getGaragem();

    document.querySelector("#garagem").innerHTML = "";

    garagem.forEach(c => addCarToGaragem(c))
}
    //criando a segunda função que vai adicionar os carros no sistema// 
    function addCarToGaragem (car){
        const row = document.createElement("tr");

        row.innerHTML = ` 
        <td>   ${car.name}</td>
        <td>   ${car.licence}</>
        <td data-time=${car.time}>${new Date(car.time) 
            // aqui vai o horario correto
            .toLocaleString("pt-BR", { 
                hour: "numeric", minute: "numeric"
            })}</td>
        <td>
            <button class="delete">x</button>
        </td>
        
        `;
        document.querySelector("#garagem").appendChild(row)
    };
        //terceira função
    function checkOut(info){
        let period = new Date() - new Date(info[2].dataset.time);
        period = convertPeriod(period);

        const licence = info[1].textContent;
        const msg = `O veiculo ${info[0].textContent} de placa ${licence} permaneceu estacionado por ${period},
        Deseja encerrar?`;
        if(!confirm(msg)) return;

        const garagem = getGaragem().filter(c => c.licence !== licence);
        localStorage.garagem = JSON.stringify(garagem);

        console.log(licence, garagem);
        renderGaragem();///////////////////////

    }
    const getGaragem = () => localStorage.garagem ? JSON.parse(localStorage.garagem) : [];
    

    renderGaragem();
    document.querySelector("#send").addEventListener("click", e => {
        const name = document.querySelector("#name"). value
        const licence = document.querySelector("#licence").value

        // fazendo as validações dos campos pra ver se esta vazio 
        if(!name || !licence){
            alert("Os campos são obrigatorios!");
            return;
        }

        const car = {name, licence, time: new Date()} //aqui consigo ver o que tem dentro da variavel Car
        const garagem = getGaragem();
        garagem.push(car);

        localStorage.garagem = JSON.stringify(garagem);
        
        
        // chamando a a primeira função
        addCarToGaragem(car);

        // limpando os campos de imput
        document.querySelector("#name").value = "";
        document.querySelector("#licence").value = "";
    });
    document.querySelector("#garagem").addEventListener("click", e =>{
        if(e.target.className = "delete")
        checkOut(e.target.parentElement.parentElement.cells);
    })
})();

