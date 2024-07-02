function login(){

    const us = document.querySelector("#nomeusuario");
    const sh = document.querySelector("#senha");
    
    //usamos o comando trim para eleminar os espaços

    if(us.value.trim() == "" || sh.value.trim()==""){
        return alert("Você deve preencher os campos");
    }
    

    fetch("http://127.0.0.1:9000/api/v1/users/login",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            nomeusuario:us.value,
            senha:sh.value
        })
    }).then((res)=>res.json())
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>console.error(`Erro ao tenta acessar a api ${error}`));



}

function cadastrarUsuario(){
    const us = document.querySelector("#txtusuario");
    const sh = document.querySelector("#txtsenha");
    const ft = document.querySelector("#txtfotoperfil");

    if(us.value.trim()=="" || sh.value.trim()=="" || ft.value.trim()==""){
        return alert("Preencha todos os campos");
    }
    fetch("http://127.0.0.1:9000/api/v1/users/cadastrar",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            nomeusuario:us.value,
            senha:sh.value,
            foto:ft.value
        })
    })
    .then((res)=>res.json())
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>console.error(`Erro na api ${error}`))
}

function carregarLivros(){
    const conteudo = document.querySelector(".conteudo");
    fetch("http://localhost:9001/api/v1/livros/detalhes")
    .then((res)=>res.json())
    .then((dados)=>{
        dados.payload.map((rs)=>{
            let card = `<div class="card col-md-3 livro">
            <img src=${rs.foto1} class="card-img-top">
            <div class="card-body">
            <h3>${rs.nometitulo}</h3>
              <p class="card-text">Autor:${rs.autor}</p>
              <p class="card-text" style="text-decoration:line-through">De R$ ${rs.precoatual}</p>
              <p class="card-text">Por R$ ${rs.precodesconto}</p>
              <a href="detalhes.html?idlivro=${rs.idtitulo}" class="btn btn-dark">Saiba Mais</a>
            </div>
          </div>`;

            conteudo.innerHTML += card;

        })
    })
    
}

function detalhes(){
    let id_url = window.location.search.split('=');
    console.log(id_url)
    const conteudo = document.querySelector(".conteudo")
    fetch("http://localhost:9001/api/v1/livros/detalhes/"+id_url[1])
    .then((res)=>res.json())
    .then((dados)=>{
        dados.payload.map((rs)=>{
            let card = `<div class="card mb-3 col-md-10">
            <div class="row g-0">
              <div class="col-md-3">
                <div id="carouselExampleFade" class="carousel slide carousel-fade carouselDetalhe">
            <div class="carousel-inner ">
              <div class="carousel-item active ">
                <img src="${rs.foto1}" class="d-block w-100" alt="Capa do Livro">
              </div>
              <div class="carousel-item">
                <img src="${rs.foto2}" class="d-block w-100" alt="Imagens do livro 1">
              </div>
              <div class="carousel-item">
                <img src="${rs.foto3}" class="d-block w-100" alt="Imagens do livro 2">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
              </div>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h3 class="card-title">${rs.nometitulo}</h3>
                  <h5 class="card-title">Autor: ${rs.autor}</h5>
                  <p class="card-text">${rs.sinopse}</p>
                  <p id="preco" class="card-text">${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto}</p>
                </div>
            </div>
          </div>`;

            conteudo.innerHTML += card;

        })
    })
    .catch((error)=>console.error(`erro na api ${error}`))
}