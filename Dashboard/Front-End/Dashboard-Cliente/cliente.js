// Seletor único
// ——————————————————————————————————————
const $ = selector => document.querySelector(selector);

// ——————————————————————————————————————
// 1) Menu lateral e Chat
// ——————————————————————————————————————
function initMenuChat() {
  const btnMenu = $('#btnMenu');
  const menuLateral = $('#menuLateral');
  btnMenu?.addEventListener('click', () => {
    menuLateral.classList.toggle('escondido');
    menuLateral.classList.toggle('ativo');
  });

  const btnChat = $('#btnChat');
  const chatBox = $('#chatBox');
  btnChat?.addEventListener('click', () => {
    chatBox.classList.toggle('escondido');
  });
}

// ——————————————————————————————————————
// 2) Fetch do perfil e autenticação
// ——————————————————————————————————————
async function fetchUserProfile(token) {
  const resp = await fetch('http://localhost:3000/api/auth/perfil', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!resp.ok) throw new Error('Não autenticado');
  return resp.json();
}

// ——————————————————————————————————————
// 3) Atualiza Header e Configurações com nome + foto
// ——————————————————————————————————————
function updateHeaderAndConfig(user, fotoUrl) {
  // Header
  const nomeSpan = $('.nome-cliente');
  if (nomeSpan) nomeSpan.innerText = `${user.nome} ${user.sobrenome}`;
  const fotoHeader = $('.foto-cliente img');
  if (fotoHeader) {
    fotoHeader.src = fotoUrl;
    fotoHeader.alt = `${user.nome} ${user.sobrenome}`;
  }
  // Configurações
  const olaH2 = $('.texto-ola h2');
  if (olaH2) olaH2.innerText = `${user.nome} ${user.sobrenome}`;
  const fotoConfig = $('.foto-cliente-config');
  if (fotoConfig) {
    fotoConfig.innerHTML = `<img src="${fotoUrl}" alt="${user.nome}">`;
  }
}

// ——————————————————————————————————————
// 4) Página dados.html: preenche campos, auto‑save e manual save
// ——————————————————————————————————————
function initDadosPage(user, fotoUrl, token) {
  // Mapeia id→chave API
  const fieldMap = {
    nome: 'nome',
    email: 'email',
    celular: 'celular',
    documento: 'cpf_cnpj',
    endereco: 'endereco',
    // tenta encontrar <input id="cep"> ou <input id="cidade"> para o CEP
    cep: 'cep',
    cidade: 'cep'
  };

  // Preenche inputs
  Object.entries(fieldMap).forEach(([id, key]) => {
    const inp = document.getElementById(id);
    if (inp && user[key] != null) {
      inp.value = user[key];
    }
  });

  // Preview da foto
  const fotoDados = $('.foto-cliente-dados');
  if (fotoDados) {
    fotoDados.innerHTML = `<img src="${fotoUrl}" alt="${user.nome}">`;
  }

  // Botão Salvar
  const btnSalvar = $('#btnSalvar');
  if (!btnSalvar) return;

  btnSalvar.disabled = true;

  // Auto‑save ao digitar
  Object.keys(fieldMap).forEach(id => {
    const inp = document.getElementById(id);
    if (!inp) return;
    inp.addEventListener('input', async e => {
      btnSalvar.disabled = false;
      const chave = fieldMap[id];
      await fetch('http://localhost:3000/api/auth/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ [chave]: e.target.value })
      });
    });
  });

  // Manual save (envia tudo de novo)
  btnSalvar.addEventListener('click', async () => {
    const corpo = {};
    Object.entries(fieldMap).forEach(([id, key]) => {
      const inp = document.getElementById(id);
      if (inp) corpo[key] = inp.value;
    });
  
    await fetch('http://localhost:3000/api/auth/perfil', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(corpo)
    });
  
    btnSalvar.disabled = true;
  
    // ✅ Aviso nativo
    alert("Dados pessoais alterados com sucesso!");
  });
  
}

// ——————————————————————————————————————
// 5) Cropper.js: recorte e envio imediato ao clicar em Salvar do modal
// ——————————————————————————————————————
function initCropper(token) {
  const btnEditar = $('#btnEditarFoto');
  const btnExcluir = $('#btnExcluirFoto');
  const fileIn = document.createElement('input');
  fileIn.type = 'file';
  fileIn.accept = 'image/*';

  let cropper = null;

  btnEditar?.addEventListener('click', () => fileIn.click());
  fileIn.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => openModal(reader.result);
    reader.readAsDataURL(file);
  });

  btnExcluir?.addEventListener('click', async () => {
    await fetch('http://localhost:3000/api/auth/perfil/foto', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    $('.foto-cliente-dados').innerHTML = '';
  });

  // Abre modal e instancia Cropper
  function openModal(src) {
    const mdl = $('#cropperModal');
    const img = $('#cropperImage');
    mdl.classList.remove('hidden');
    img.src = src;
    cropper = new Cropper(img, { aspectRatio: 1 });
  }

  // Botões do modal
  $('#btnCropSave')?.addEventListener('click', () => {
    const canvas = cropper.getCroppedCanvas({ width: 200, height: 200 });
    canvas.toBlob(async blob => {
      const fd = new FormData();
      fd.append('foto', blob, 'perfil.png');
      await fetch('http://localhost:3000/api/auth/perfil/foto', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      // atualiza preview
      $('.foto-cliente-dados').innerHTML =
        `<img src="${canvas.toDataURL()}" alt="Foto">`;
      closeModal();
    });
  });

  $('#btnCropCancel')?.addEventListener('click', closeModal);

  function closeModal() {
    const mdl = $('#cropperModal');
    mdl.classList.add('hidden');
    cropper.destroy();
    cropper = null;
  }
}

// ——————————————————————————————————————
// 6) Função principal de inicialização
// ——————————————————————————————————————
(async function init() {
  initMenuChat();

  const token = localStorage.getItem('token');
  if (!token) return location.href = 'login.html';

  let user;
  try {
    user = await fetchUserProfile(token);
  } catch {
    localStorage.removeItem('token');
    return location.href = 'login.html';
  }

  const fotoUrl = user.imagem.startsWith('http')
    ? user.imagem
    : `http://localhost:3000/${user.imagem}`;

  updateHeaderAndConfig(user, fotoUrl);

  if (window.location.pathname.endsWith("home-cliente.html")) {
    await preencherBlocosIniciais(token);
  }  

  if (window.location.pathname.endsWith('dados.html')) {
    initDadosPage(user, fotoUrl, token);
    initCropper(token);
  }

  if (window.location.pathname.includes("dadospet.html")) {
    await initDadosPetPage(token);
  }
  }
)();  


// Carrossel automático + manual
let indiceAtual = 0;
const imagens = document.querySelectorAll('.carrossel-img');
const bolinhas = document.querySelectorAll('.bolinha');

function mostrarSlide(index) {
  imagens.forEach((img, i) => {
    img.classList.remove('ativa');
    bolinhas[i].classList.remove('ativa');
    if (i === index) {
      img.classList.add('ativa');
      bolinhas[i].classList.add('ativa');
    }
  });
  indiceAtual = index;
}

function proximoSlide() {
  let novoIndex = (indiceAtual + 1) % imagens.length;
  mostrarSlide(novoIndex);
}

bolinhas.forEach((bolinha, i) => {
  bolinha.addEventListener('click', () => {
    mostrarSlide(i);
  });
});

// Inicia o carrossel
setInterval(proximoSlide, 4000); // Troca a imagem a cada 4 segundos


// Exemplo JS (pode adaptar para backend)
const possuiAgendamentos = true; // substituir pela verificação real

if (possuiAgendamentos) {
  document.getElementById('sem-agendamento').classList.add('escondido');
  document.getElementById('com-agendamento').classList.remove('escondido');
} else {
  document.getElementById('sem-agendamento').classList.remove('escondido');
  document.getElementById('com-agendamento').classList.add('escondido');
}

(async () => {
  const token = localStorage.getItem("token");
  if (!token) return location.href = "login.html";
  const resp = await fetch("http://localhost:3000/api/auth/perfil", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!resp.ok) return localStorage.removeItem("token"), location.href = "login.html";
  const u = await resp.json();
  // u = { nome, sobrenome, cpf_cnpj, endereco, cep, email, imagem }
  localStorage.setItem("nome", u.nome);
  localStorage.setItem("sobrenome", u.sobrenome);
  localStorage.setItem("cpf", u.cpf_cnpj);
  localStorage.setItem("endereco", u.endereco);
  localStorage.setItem("cep", u.cep);
  localStorage.setItem("email", u.email);
  localStorage.setItem("imagem", u.imagem);
  // Exibe na UI:
  document.querySelector(".nome-cliente").innerText = `${u.nome} ${u.sobrenome}`;
  document.querySelector(".foto-cliente img").src = u.imagem;
})();

async function preencherBlocosIniciais(token) {
  const servicosContainer = document.querySelector(".blocos-informativos .bloco:nth-child(1) .conteudo-rolavel");
  const agendamentosContainer = document.querySelector(".blocos-informativos .bloco:nth-child(2) .conteudo-rolavel");
  const petsContainer = document.querySelector(".blocos-informativos .bloco:nth-child(3) .conteudo-rolavel");

  // Simulações de chamadas (troque para suas rotas reais depois)
  const [servicosResp, agendamentosResp, petsResp] = await Promise.all([
    fetch("/api/servicos/recentes", { headers: { Authorization: `Bearer ${token}` } }),
    fetch("/api/cliente/agendamentos", { headers: { Authorization: `Bearer ${token}` } }),
    fetch("/api/cliente/pets", { headers: { Authorization: `Bearer ${token}` } }),
  ]);
  
  const [servicos, agendamentos, pets] = await Promise.all([
    servicosResp.ok ? servicosResp.json() : [],
    agendamentosResp.ok ? agendamentosResp.json() : [],
    petsResp.ok ? petsResp.json() : [],
  ]);
  
  // SERVIÇOS
  servicosContainer.innerHTML = "";
  if (servicos.length > 0) {
    servicos.forEach(s => {
      const div = document.createElement("div");
      div.className = "servico";
      div.textContent = s.nome;
      servicosContainer.appendChild(div);
    });
  } else {
    servicosContainer.innerHTML = `
      <p style="text-align:center; font-weight:bold;">Você não utilizou nenhum serviço recentemente</p>
      <button onclick="window.location.href='agendamento.html'" class="btn-agendamento" style="margin: 15px auto; display: block;">Ver serviços</button>
    `;
  }

  // AGENDAMENTOS
  agendamentosContainer.innerHTML = "";
  if (agendamentos.length > 0) {
    agendamentos.forEach(a => {
      const div = document.createElement("div");
      div.className = "agendamento";
      div.textContent = `${a.data} às ${a.horario}`;
      agendamentosContainer.appendChild(div);
    });
  } else {
    agendamentosContainer.innerHTML = `
      <p style="text-align:center; font-weight:bold;">Você não possui agendamentos próximos</p>
      <button onclick="window.location.href='agendamento.html'" class="btn-agendamento" style="margin: 15px auto; display: block;">Agendar agora</button>
    `;
  }

  // PETS
  petsContainer.innerHTML = "";
  if (pets.length > 0) {
    pets.forEach(p => {
      const bloco = document.createElement("div");
      bloco.className = "pet-cadastrado";
      bloco.innerHTML = `
        <div class="foto-pet"><img src="${p.imagem || 'pet.jpg'}" alt="${p.nome}"></div>
        <div class="info-pet">
          <p><strong>Nome:</strong> ${p.nome} &nbsp;&nbsp; <strong>Idade:</strong> ${p.idade} anos</p>
          <p><strong>Raça:</strong> ${p.raca} &nbsp;&nbsp; <strong>Gênero:</strong> ${p.genero}</p>
          <p><strong>Nascimento:</strong> ${p.nascimento}</p>
        </div>`;
      petsContainer.appendChild(bloco);
    });
  } else {
    petsContainer.innerHTML = `
      <p style="text-align:center; font-weight:bold;">Você não possui pets cadastrados</p>
      <button onclick="window.location.href='dadospet.html'" class="btn-agendamento" style="margin: 15px auto; display: block;">Cadastrar pet</button>
    `;
  }
}


// DADOS PETS

async function initDadosPetPage(token) {
  const lista = document.getElementById("listaPets");
  const modal = document.getElementById("modalPet");
  const cropModal = document.getElementById("cropperModalPet");

  const inputNome = document.getElementById("editNome");
  const inputIdade = document.getElementById("editIdade");
  const inputRaca = document.getElementById("editRaca");
  const inputNascimento = document.getElementById("editNascimento");
  const inputGenero = document.getElementById("editGenero");
  const fotoPreview = document.getElementById("fotoPreviewPet");

  let cropperPet = null;
  let selectedPet = null;

  const pets = await fetch("/api/pets", {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.json());

  lista.innerHTML = "";

  pets.forEach(p => {
    const bloco = document.createElement("div");
    bloco.className = "preview-pet";

    const info = document.createElement("div");
    info.className = "info";
    info.innerHTML = `
      <strong>${p.nome}</strong>
      Raça: ${p.raca} - ${p.idade} anos
    `;

    const img = document.createElement("img");
    img.src = p.imagem ? `http://localhost:3000/${p.imagem}` : "pet.jpg";

    const edit = document.createElement("span");
    edit.className = "editar";
    edit.textContent = "✏️";
    edit.onclick = () => abrirEdicaoPet(p);

    bloco.appendChild(img);
    bloco.appendChild(info);
    bloco.appendChild(edit);
    lista.appendChild(bloco);
  });

  function abrirEdicaoPet(pet) {
    selectedPet = pet;
    inputNome.value = pet.nome;
    inputIdade.value = pet.idade;
    inputRaca.value = pet.raca;
    inputNascimento.value = pet.nascimento?.split("T")[0];
    inputGenero.value = pet.genero;
    fotoPreview.innerHTML = `<img src="${pet.imagem ? `http://localhost:3000/${pet.imagem}` : "pet.jpg"}">`;
    modal.classList.remove("hidden");
  }

  document.getElementById("btnCancelarPet").onclick = () => {
    modal.classList.add("hidden");
    selectedPet = null;
  };

  document.getElementById("btnSalvarPet").onclick = async () => {
    const corpo = {
      nome: inputNome.value,
      idade: inputIdade.value,
      raca: inputRaca.value,
      nascimento: inputNascimento.value,
      genero: inputGenero.value
    };

    await fetch(`/api/pets/${selectedPet.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(corpo)
    });

    alert("Pet atualizado com sucesso!");
    location.reload();
  };

  document.getElementById("btnExcluirFotoPet").onclick = async () => {
    await fetch(`/api/pets/foto/${selectedPet.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fotoPreview.innerHTML = "";
  };

  const inputFotoPet = document.createElement("input");
  inputFotoPet.type = "file";
  inputFotoPet.accept = "image/*";

  document.getElementById("btnEditarFotoPet").onclick = () => inputFotoPet.click();

  inputFotoPet.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      cropModal.classList.remove("hidden");
      document.getElementById("cropperImagePet").src = reader.result;
      cropperPet = new Cropper(document.getElementById("cropperImagePet"), { aspectRatio: 1 });
    };
    reader.readAsDataURL(file);
  };

  document.getElementById("btnCropCancelPet").onclick = () => {
    cropModal.classList.add("hidden");
    cropperPet?.destroy();
    cropperPet = null;
  };

  document.getElementById("btnNovoPetReal").onclick = () => {
    selectedPet = null;
    inputNome.value = "";
    inputIdade.value = "";
    inputRaca.value = "";
    inputNascimento.value = "";
    inputGenero.value = "";
    fotoPreview.innerHTML = `<img src="pet.jpg">`;
    modal.classList.remove("hidden");
  };
  

  document.getElementById("btnCropSavePet").onclick = () => {
    cropperPet.getCroppedCanvas({ width: 200, height: 200 }).toBlob(async blob => {
      const fd = new FormData();
      fd.append("imagem", blob, "pet.jpg");

      await fetch(`/api/pets/foto/${selectedPet.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });

      cropModal.classList.add("hidden");
      cropperPet?.destroy();
      cropperPet = null;
      alert("Foto do pet atualizada!");
      location.reload();
    });
  };
}