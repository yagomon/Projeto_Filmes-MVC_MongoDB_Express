// consumindo api do backend
const urlApi = "http://localhost:3000/filmes";

// pegando o formulario
const card = document.querySelector(".cards");

// definindo variavel de edição
let edicao = false;

// definindo variavel id de edição
let idEdicao = 0;

//listar na tela
const getFilmes = async () => {
    const response = await fetch(urlApi);
    const data = await response.json();
  // console.log(data);

    data.map((filme) => {
        card.insertAdjacentHTML ("beforeend",
        `
            <li class="card" id=${filme._id}>

                <button type= "button" onclick= "deleteFilme('${filme._id}')" class="delete-filme-button">
                    <i class="fas fa-times-circle closer"></i>
                </button>

                <img src="${filme.imagem}" class="img" alt="Imagem de capa do filme Scott Pilgrim contra o Mundo"/>

                <h2 class="name">${filme.nome}</h2>

                <button type="button" onclick="putWatched('${filme._id}')" class="no-watched-button dica btn-teste">
                    <i class="fas fa-eye-slash no-watched-img"></i>
                    <p class="dica-watch-text"> Marcar como assistido </p>
                </button>


                <button type="button" onclick= "putFilme('${filme._id}')" class="edit-button dica">
                    <i class="fas fa-edit edit-button-img"></i>
                    <p class="dica-edit-text"> Editar Filme </p>
                </button>
            

                <span class="genre">${filme.genero}</span>

                <h3 class="rate">${filme.nota}</h3>

                ${filme.status ? `  
                    <section id= "watched"> 
                    <div class="card-watched">
                        <button type="button" onclick="putWatched('${filme._id}')" class="card-watched-button" >
                            <i class="far fa-eye card-watched-img"></i>
                            <h3 class= "card-watched-text" >Assistido</h3>
                        </button>
                    </div>
                </section> 
                ` : ""}
                
            
            </li>    
            `
            );
        });
};
getFilmes();

// Post and Put [Inserir e editar]
const submitForm = async (event) => {
    event.preventDefault();

//pegar os inputs
    let nome = document.getElementById("nome");
    let imagem = document.getElementById("imagem");
    let genero = document.getElementById("genero");
    let nota = document.getElementById("nota");

  // console.log(nome.value)

  //montar o objeto json com o valor dos inputs
    const filme = {
        nome: nome.value,
        imagem: imagem.value,
        genero: genero.value,
        nota: parseInt(nota.value),
    };

    //Verifica modo de edição e dispara o post
    if (!edicao) {
        const request = new Request(`${urlApi}/add`, {
            method: "POST",
            body: JSON.stringify(filme),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });

        // chama o fetch na função de post montava acima
        const response = await fetch(request);

        //pega o result do fetch
        const result = await response.json();

        //se houver dados de resposta posta no html, caso contrário entra no Editar [put]
        if (result) {
            getFilmes();
        }
    } else {
        const request = new Request(`${urlApi}/${idEdicao}`, {
            method: "PUT",
            body: JSON.stringify(filme),
            headers: new Headers({
            "Content-Type": "application/json",
            }),
        });

        //chama o fetch passando o put
        const response = await fetch(request);
        // pega o fetch result em json
        const result = await response.json();

        // vê se teve retorno e renderiza com getFilmes
        if (result) {
            getFilmes();
        }
        //sair do modo edição
        edicao = false;
        idEdicao = 0;
    }

    // limpar campos dos inputs
    nome.value = "";
    imagem.value = "";
    genero.value = "";
    nota.value = "";

    //limpar o card no html
    card.innerHTML = "";
};

//filme por id
const getFilmeById = async (id) => {
    const response = await fetch(`${urlApi}/${id}`);
    return (response.json());
};

const putFilme = async (id) => {
    const filme = await getFilmeById(id);

  // pegar os novos inputs
    let nomeEdit = document.getElementById("nome");
    let imagemEdit = document.getElementById("imagem");
    let generoEdit = document.getElementById("genero");
    let notaEdit = document.getElementById("nota");

  //preencher html como novos valores
    nomeEdit.value = filme.nome;
    imagemEdit.value = filme.imagem;
    generoEdit.value = filme.genero;
    notaEdit.value = filme.nota;

  //entrar do modo edição
    edicao = true;
    idEdicao = id;
};

const deleteFilme = async (id) => {
    const request = new Request(`${urlApi}/${id}`, {
        method: "DELETE",
    });

    const response = await fetch(request);
    const data = await response.json();
    console.log(data.info);

    card.innerHTML = "";
    getFilmes();
};

const putWatched = async (id) => {
    const filme = await getFilmeById(id);

    let status= false;

    if (!filme.status){
        status =  true
    }

        const filmeVisto = {
            status
        }

        const request = new Request(`${urlApi}/${id}`, {
            method: "PUT",
            body: JSON.stringify(filmeVisto),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });

        const response = await fetch(request);
        const result = await response.json();

        card.innerHTML = "";
        
        getFilmes()
    

}