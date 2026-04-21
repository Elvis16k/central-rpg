let jogadores = JSON.parse(localStorage.getItem("jogadores") || "[]")

function salvar(){
    localStorage.setItem("jogadores", JSON.stringify(jogadores))
}

function getStatusClasse(j){
    const limite = 6 + (j.fisico || 0)
    const dano = j.dano || 0

    if(dano >= limite) return "status-critico"
    if(dano >= limite/2) return "status-ferido"
    return "status-normal"
}

function carregar(){
    const lista = document.getElementById("lista")
    lista.innerHTML = ""

    jogadores.forEach((j, i)=>{

        const status = getStatusClasse(j)

        const div = document.createElement("div")
        div.className = `card ${status}`

        div.innerHTML = `
        <div class="foto-container">
            ${j.foto 
                ? `<img src="${j.foto}" class="foto">`
                : `<div class="foto-placeholder">👤</div>`
            }
        </div>

        <strong>${j.nome}</strong>

        <button onclick="abrirFicha(${i})">
            Abrir Ficha
        </button>
        `

        lista.appendChild(div)
    })
}

function novoJogador(){
    const nome = prompt("Nome do jogador:")
    if(!nome) return

    const foto = prompt("Cole a URL da imagem do personagem (opcional):")

    jogadores.push({
        nome,
        foto: foto || "",
        fisico:0,
        mental:0,
        personalidade:0,
        dano:0,
        folegoAtual:5,
        inventario:[]
    })

    salvar()
    carregar()
}

function abrirFicha(i){
    localStorage.setItem("jogadorAtual", i)
    window.location.href = "ficha.html"
}

carregar()