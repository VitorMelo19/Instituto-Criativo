// Menu lateral
const btnMenu = document.getElementById('btnMenu');
const menuLateral = document.getElementById('menuLateral');
btnMenu.addEventListener('click', () => {
  menuLateral.classList.toggle('escondido');
  menuLateral.classList.toggle('ativo');
});

// Chat box
const btnChat = document.getElementById('btnChat');
const chatBox = document.getElementById('chatBox');
btnChat.addEventListener('click', () => {
  chatBox.classList.toggle('escondido');
});


window.addEventListener("DOMContentLoaded", () => {
  // Dados do admin (foto e nome)
  fetch("http://localhost:3000/api/auth/perfil", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(res => res.json())
    .then(admin => {
      const nomeAdmin = document.querySelector(".nome-admin");
      const fotoAdmin = document.querySelector(".foto-admin img");

      if (nomeAdmin) nomeAdmin.textContent = `${admin.nome} ${admin.sobrenome || ""}`;
      if (fotoAdmin) fotoAdmin.src = `/uploads/${admin.imagem || 'cliente.jpg'}`;
    })
    .catch(() => {
      console.warn("Erro ao carregar dados do admin.");
    });

  // GRÁFICO
  const ctx = document.getElementById("graficoServicos");
  if (ctx) {
    fetch("http://localhost:3000/api/admin/servicos-mais-usados", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((dados) => {
        const nomes = dados.map(item => item.nome);
        const totais = dados.map(item => item.total);

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: nomes,
            datasets: [{
              label: "Serviços mais utilizados",
              data: totais,
              backgroundColor: "#f76c1e"
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: "Serviços mais utilizados",
                color: "#fff",
                font: { size: 18 }
              }
            },
            scales: {
              x: { ticks: { color: "#fff" } },
              y: { ticks: { color: "#fff" }, beginAtZero: true }
            }
          }
        });
      })
      .catch(() => {
        console.warn("Erro ao carregar gráfico.");
      });
  }
});


// ABRIR AGENDA PRINCIPAL
document.getElementById("abrirAgendamento").addEventListener("click", () => {
  limparEtapas();
  document.getElementById("overlay-1").classList.add("ativo");
});

// CANCELAR DE QUALQUER TELA
document.querySelectorAll(".btn-cancelar").forEach(btn => {
  btn.addEventListener("click", limparEtapas);
});

function limparEtapas() {
  document.querySelectorAll(".overlay").forEach(overlay => overlay.classList.remove("ativo"));
  
  const listaClientes = document.getElementById("resultadoClientes");
  if (listaClientes) {
    listaClientes.innerHTML = "";
    listaClientes.classList.add("escondido");
  }

  const confirmarCliente = document.getElementById("confirmarCliente");
  if (confirmarCliente) confirmarCliente.classList.add("escondido");

  const pets = document.getElementById("listaPetsCliente");
  if (pets) pets.innerHTML = "";

  const petsSelecionados = document.getElementById("resumoPetsSelecionados");
  if (petsSelecionados) petsSelecionados.innerHTML = "";

  const servicos = document.getElementById("listaServicos");
  if (servicos) servicos.innerHTML = "";

  const grade = document.getElementById("gradeHorarios");
  if (grade) grade.innerHTML = "";

  const data = document.getElementById("dataAgendamento");
  if (data) data.value = "";

  const obs = document.getElementById("observacoes");
  if (obs) obs.value = "";

  window.clienteSelecionado = null;
  window.petsSelecionados = [];
}

// MOSTRAR GRADE AO CLICAR NO ÍCONE
document.getElementById("btnAbrirGrade").addEventListener("click", () => {
  const grade = document.getElementById("gradeHorarios");
  grade.classList.toggle("escondido");
});

// MOSTRAR HORÁRIOS AO ESCOLHER DATA
document.getElementById("dataAgendamento").addEventListener("change", () => {
  const data = document.getElementById("dataAgendamento").value;
  const grade = document.getElementById("gradeHorarios");
  grade.innerHTML = "";

  if (!data) return;

  fetch(`http://localhost:3000/api/admin/horarios-disponiveis?data=${data}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => res.json())
    .then(horarios => {
      horarios.forEach(h => {
        const box = document.createElement("div");
        box.className = "horario-box";
        box.textContent = h;
        box.dataset.valor = h;
        box.addEventListener("click", () => {
          document.getElementById("inputHorarioSelecionado").value = h;
          document.querySelectorAll(".horario-box").forEach(b => b.classList.remove("selecionado"));
          box.classList.add("selecionado");
          grade.classList.add("escondido");
        });
        grade.appendChild(box);
      });
    });
});

// BUSCA CLIENTES
document.getElementById("btnBuscarCliente").addEventListener("click", () => {
  const termo = document.getElementById("inputBuscaCliente").value.trim();
  if (!termo) return;

  fetch(`http://localhost:3000/api/admin/clientes?buscar=${encodeURIComponent(termo)}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => res.json())
    .then(clientes => {
      const lista = document.getElementById("resultadoClientes");
      lista.innerHTML = "";
      lista.classList.remove("escondido");

      if (clientes.length === 0) {
        lista.innerHTML = "<p style='color:#000; padding: 10px;'>Nenhum cliente encontrado.</p>";
        return;
      }

      clientes.forEach(cliente => {
        const div = document.createElement("div");
        div.className = "resultado-item";
        div.dataset.id = cliente.id;
        div.innerHTML = `
          <img src="/uploads/${cliente.imagem || 'cliente.jpg'}" />
          <div>
            <p><strong>${cliente.nome} ${cliente.sobrenome || ""}</strong></p>
            <p>Email: ${cliente.email}</p>
            <p>CPF/CNPJ: ${cliente.cpf_cnpj}</p>
            <p>Telefone: ${cliente.telefone}</p>
          </div>
        `;
        div.addEventListener("click", () => {
          document.querySelectorAll("#resultadoClientes .resultado-item").forEach(i => i.classList.remove("selecionado"));
          div.classList.add("selecionado");
          window.clienteSelecionado = cliente;
          document.getElementById("confirmarCliente").classList.remove("escondido");
        });
        lista.appendChild(div);
      });
    });
});

// CONFIRMAR CLIENTE → ETAPA 2
document.getElementById("confirmarCliente").addEventListener("click", () => {
  if (!window.clienteSelecionado) return;
  document.getElementById("overlay-1").classList.remove("ativo");
  document.getElementById("overlay-2").classList.add("ativo");

  document.getElementById("nomeClienteSelecionado").textContent =
    `${window.clienteSelecionado.nome} ${window.clienteSelecionado.sobrenome}`;
  document.getElementById("fotoClienteSelecionado").src =
    `/uploads/${window.clienteSelecionado.imagem || 'cliente.jpg'}`;

  fetch(`http://localhost:3000/api/pets/${window.clienteSelecionado.id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => res.json())
    .then(pets => {
      const lista = document.getElementById("listaPetsCliente");
      lista.innerHTML = "";

      pets.forEach(pet => {
        const div = document.createElement("div");
        div.className = "resultado-item";
        div.dataset.id = pet.id;
        div.innerHTML = `
        <img src="/uploads/${pet.imagem || 'pet.png'}" />
        <div>
          <p><strong>${pet.nome}</strong></p>
          <p>${pet.raca}, ${pet.idade} anos</p>
          <p>Gênero: ${pet.genero}</p>
          <p>Nasc.: ${pet.data_nascimento || '---'}</p>
        </div>
        `;
        div.addEventListener("click", () => {
          div.classList.toggle("selecionado");
        });
        lista.appendChild(div);
      });
    });
});

// BOTÃO DE NOVO PET
document.getElementById("cadastrarNovoPet").addEventListener("click", () => {
  window.location.href = `cadastro-pet.html?idCliente=${window.clienteSelecionado.id}`;
});

// CONFIRMAR PETS → ETAPA 3
document.getElementById("confirmarPets").addEventListener("click", () => {
  const petsSelecionados = Array.from(document.querySelectorAll("#listaPetsCliente .selecionado"));
  if (petsSelecionados.length === 0) return;

  document.getElementById("overlay-2").classList.remove("ativo");
  document.getElementById("overlay-3").classList.add("ativo");

  const box = document.getElementById("resumoPetsSelecionados");
  box.innerHTML = "";
  petsSelecionados.forEach(div => {
    const petClone = div.cloneNode(true);
    petClone.classList.remove("resultado-item");
    petClone.classList.add("pet-box");
    box.appendChild(petClone);
  });

  document.getElementById("nomeClienteFinal").textContent =
    `${window.clienteSelecionado.nome} ${window.clienteSelecionado.sobrenome}`;
  document.getElementById("fotoClienteFinal").src =
    `/uploads/${window.clienteSelecionado.imagem || 'cliente.jpg'}`;

  fetch(`http://localhost:3000/api/servicos`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => res.json())
    .then(servicos => {
      const lista = document.getElementById("listaServicos");
      lista.innerHTML = "";
      servicos.forEach(serv => {
        const div = document.createElement("div");
        div.className = "resultado-item";
        div.dataset.id = serv.id;
        div.innerHTML = `
          <div>
            <p><strong>${serv.nome}</strong></p>
            <p>${serv.descricao}</p>
            <p>R$ ${serv.preco}</p>
          </div>
        `;
        div.addEventListener("click", () => {
          document.querySelectorAll("#listaServicos .resultado-item").forEach(i => i.classList.remove("selecionado"));
          div.classList.add("selecionado");
        });
        lista.appendChild(div);
      });
    });
});

// FINALIZAR AGENDAMENTO
document.getElementById("btnConfirmarAgendamento").addEventListener("click", () => {
  const data = document.getElementById("dataAgendamento").value;
  const horario = document.getElementById("inputHorarioSelecionado").value;
  const observacoes = document.getElementById("observacoes").value;

  const servicoSelecionado = document.querySelector("#listaServicos .selecionado");
  const petsSelecionados = Array.from(document.querySelectorAll("#listaPetsCliente .selecionado"));

  if (!data || !horario || !servicoSelecionado || petsSelecionados.length === 0) {
    alert("Preencha todos os campos!");
    return;
  }

  const servicoId = servicoSelecionado.dataset.id;
  const servicos = [servicoId]; // transforma em array
  const petsIds = petsSelecionados.map(p => p.dataset.id);

  const payload = {
    clienteId: window.clienteSelecionado.id,
    id_pet: petsIds[0], // envia o primeiro pet selecionado
    servicos: servicos,
    data_agendamento: data,
    horario,
    observacoes
  };
  
  

  fetch("http://localhost:3000/api/admin/agendar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(() => {
      alert("Agendamento realizado com sucesso!");
      limparEtapas();
    })
    .catch(() => {
      alert("Erro ao salvar agendamento.");
    });
});

document.getElementById("voltarParaCliente").addEventListener("click", () => {
  document.getElementById("overlay-2").classList.remove("ativo");
  document.getElementById("overlay-1").classList.add("ativo");
});

document.getElementById("voltarParaPets").addEventListener("click", () => {
  document.getElementById("overlay-3").classList.remove("ativo");
  document.getElementById("overlay-2").classList.add("ativo");
});

// BOTÃO DE CADASTRO DE SERVIÇO
document.getElementById("abrirCadastroServico").addEventListener("click", () => {
  limparEtapas();
  document.getElementById("overlay-cadastro-servico").classList.add("ativo");
});
// ABRIR SOBREPOSIÇÃO DE CADASTRO DE SERVIÇO
document.getElementById("abrirCadastroServico").addEventListener("click", () => {
  limparEtapas();
  document.getElementById("overlay-cadastro-servico").classList.add("ativo");
  carregarServicosParaEdicao();
});

function carregarServicosParaEdicao() {
  fetch("http://localhost:3000/api/admin/servicos", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => res.json())
    .then(servicos => {
      const lista = document.getElementById("listaServicosCadastro");
      lista.innerHTML = "";

      servicos.forEach(serv => {
        const item = document.createElement("div");
        item.className = "resultado-item";
        item.innerHTML = `
          <div style="flex: 1">
            <p><strong>${serv.nome}</strong></p>
            <p>${serv.descricao}</p>
            <p>R$ ${serv.preco}</p>
          </div>
          <button class="btn-editar-servico" data-id="${serv.id}" data-nome="${serv.nome}" data-desc="${serv.descricao}" data-preco="${serv.preco}">✏️</button>
        `;
        lista.appendChild(item);
      });

      document.querySelectorAll(".btn-editar-servico").forEach(btn => {
        btn.addEventListener("click", () => {
          abrirEdicaoServico(btn.dataset.id, btn.dataset.nome, btn.dataset.desc, btn.dataset.preco);
        });
      });
    });
}

// CRIA SOBREPOSIÇÃO DE EDIÇÃO
function abrirEdicaoServico(id, nome, descricao, preco) {
  const overlay = document.createElement("div");
  overlay.className = "overlay ativo";
  overlay.id = "overlay-editar-servico";
  overlay.innerHTML = `
    <div class="modal-agendamento">
      <h2>Editar Serviço</h2>
      <label>Nome do Serviço</label>
      <input type="text" id="editNome" value="${nome}">
      <label>Descrição</label>
      <input type="text" id="editDesc" value="${descricao}">
      <label>Preço</label>
      <input type="number" id="editPreco" value="${preco}">

      <div class="botoes-modal">
        <button class="btn-cancelar" onclick="document.body.removeChild(document.getElementById('overlay-editar-servico'))">Cancelar</button>
        <button class="btn-cancelar" onclick="document.body.removeChild(document.getElementById('overlay-editar-servico')); document.getElementById('overlay-cadastro-servico').classList.add('ativo')">Voltar</button>
        <button class="btn-confirmar" id="btnSalvarEdicao">Salvar</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("btnSalvarEdicao").addEventListener("click", () => {
    const dados = {
      nome: document.getElementById("editNome").value,
      descricao: document.getElementById("editDesc").value,
      preco: document.getElementById("editPreco").value
    };

    fetch(`http://localhost:3000/api/admin/servicos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(dados)
    })
      .then(res => res.json())
      .then(() => {
        alert("Serviço atualizado com sucesso!");
        document.body.removeChild(document.getElementById("overlay-editar-servico"));
        carregarServicosParaEdicao();
      });
  });
}

// BOTÃO "CADASTRAR NOVO SERVIÇO"
document.getElementById("btnNovoServico").addEventListener("click", () => {
  const overlay = document.createElement("div");
  overlay.className = "overlay ativo";
  overlay.id = "overlay-novo-servico";
  overlay.innerHTML = `
    <div class="modal-agendamento">
      <h2>Cadastrar Novo Serviço</h2>
      <label>Nome do Serviço</label>
      <input type="text" id="novoNome" placeholder="Nome do serviço">
      <label>Descrição</label>
      <input type="text" id="novoDesc" placeholder="Descrição">
      <label>Preço</label>
      <input type="number" id="novoPreco" placeholder="Preço">
      <div class="botoes-modal">
        <button class="btn-cancelar" onclick="document.body.removeChild(document.getElementById('overlay-novo-servico'))">Cancelar</button>
        <button class="btn-confirmar" id="btnSalvarNovo">Salvar</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("btnSalvarNovo").addEventListener("click", () => {
    const dados = {
      nome: document.getElementById("novoNome").value,
      descricao: document.getElementById("novoDesc").value,
      preco: document.getElementById("novoPreco").value
    };

    fetch("http://localhost:3000/api/admin/servicos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(dados)
    })
      .then(res => res.json())
      .then(() => {
        alert("Serviço cadastrado com sucesso!");
        document.body.removeChild(document.getElementById("overlay-novo-servico"));
        carregarServicosParaEdicao();
      });
  });
});

// ABRIR SOBREPOSIÇÃO DE CLIENTES
document.getElementById("abrirCadastroCliente").addEventListener("click", () => {
  limparEtapas();
  document.getElementById("overlay-cadastro-cliente").classList.add("ativo");
  document.getElementById("listaClientesAdm").innerHTML = "";
});

// BUSCAR CLIENTES PELO BOTÃO DE BUSCA
document.getElementById("btnBuscarClienteAdm").addEventListener("click", () => {
  const termo = document.getElementById("inputBuscaClienteAdm").value.trim();
  if (!termo) return;

  fetch(`http://localhost:3000/api/admin/clientes?buscar=${encodeURIComponent(termo)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(res => res.json())
    .then(clientes => {
      const lista = document.getElementById("listaClientesAdm");
      lista.innerHTML = "";

      clientes.forEach(cliente => {
        const div = document.createElement("div");
        div.className = "resultado-item";
        div.innerHTML = `
          <img src="/uploads/${cliente.imagem || 'cliente.jpg'}" />
          <div>
            <p><strong>${cliente.nome} ${cliente.sobrenome || ""}</strong></p>
            <p>Email: ${cliente.email}</p>
            <p>CPF/CNPJ: ${cliente.cpf_cnpj}</p>
            <p>Telefone: ${cliente.telefone}</p>
          </div>
          <button class="btn-editar-cliente" 
            data-id="${cliente.id}"
            data-nome="${cliente.nome}"
            data-sobrenome="${cliente.sobrenome}"
            data-email="${cliente.email}"
            data-cpf="${cliente.cpf_cnpj}"
            data-telefone="${cliente.telefone}"
            data-endereco="${cliente.endereco || ''}"
            data-numero="${cliente.numero || ''}"
            data-cep="${cliente.cep || ''}"
          >✏️</button>
        `;
        lista.appendChild(div);
      });

      document.querySelectorAll(".btn-editar-cliente").forEach(btn => {
        btn.addEventListener("click", () => {
          abrirEdicaoCliente(btn.dataset);
        });
      });
    });
});

// CRIAR SOBREPOSIÇÃO PARA EDITAR CLIENTE
function abrirEdicaoCliente(dados) {
  const overlay = document.createElement("div");
  overlay.className = "overlay ativo";
  overlay.id = "overlay-editar-cliente";
  overlay.innerHTML = `
    <div class="modal-agendamento">
      <h2>Editar Cliente</h2>

      <label>Nome</label>
      <input type="text" id="editNome" value="${dados.nome}">

      <label>Sobrenome</label>
      <input type="text" id="editSobrenome" value="${dados.sobrenome}">

      <label>CPF/CNPJ</label>
      <input type="text" id="editCpfCnpj" value="${dados.cpf}">

      <label>Email</label>
      <input type="email" id="editEmail" value="${dados.email}">

      <label>Telefone</label>
      <input type="text" id="editTelefone" value="${dados.telefone}">

      <label>Endereço, Nº</label>
      <input type="text" id="editEndereco" value="${dados.endereco}">

      <label>CEP</label>
      <input type="text" id="editCep" value="${dados.cep}">

      <div class="botoes-modal">
        <button class="btn-cancelar" onclick="document.body.removeChild(document.getElementById('overlay-editar-cliente'))">Cancelar</button>
        <button class="btn-confirmar" id="btnSalvarEdicaoCliente">Salvar</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("btnSalvarEdicaoCliente").addEventListener("click", () => {
    const payload = {
      nome: document.getElementById("editNome").value,
      sobrenome: document.getElementById("editSobrenome").value,
      cpf_cnpj: document.getElementById("editCpfCnpj").value,
      email: document.getElementById("editEmail").value,
      telefone: document.getElementById("editTelefone").value,
      endereco: document.getElementById("editEndereco").value,
      cep: document.getElementById("editCep").value
    };

    if (Object.values(payload).some(val => val.trim() === "")) {
      alert("Preencha todos os campos!");
      return;
    }

    fetch(`http://localhost:3000/api/admin/clientes/${dados.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => {
        alert("Cliente atualizado com sucesso!");
        document.body.removeChild(document.getElementById("overlay-editar-cliente"));
        document.getElementById("btnBuscarClienteAdm").click();
      });
  });
}

// BOTÃO DE NOVO CLIENTE
document.getElementById("btnNovoCliente").addEventListener("click", () => {
  const overlay = document.createElement("div");
  overlay.className = "overlay ativo";
  overlay.id = "overlay-novo-cliente";
  overlay.innerHTML = `
    <div class="modal-agendamento">
      <h2>Cadastrar Novo Cliente</h2>

      <label>Nome</label>
      <input type="text" id="novoNome">

      <label>Sobrenome</label>
      <input type="text" id="novoSobrenome">

      <label>CPF/CNPJ</label>
      <input type="text" id="novoCpfCnpj">

      <label>Email</label>
      <input type="email" id="novoEmail">

      <label>Senha</label>
      <input type="password" id="novoSenha">

      <label>Telefone</label>
      <input type="text" id="novoTelefone">

      <label>Endereço, Nº</label>
      <input type="text" id="novoEndereco">

      <label>CEP</label>
      <input type="text" id="novoCep">

      <div class="botoes-modal">
        <button class="btn-cancelar" onclick="document.body.removeChild(document.getElementById('overlay-novo-cliente'))">Cancelar</button>
        <button class="btn-confirmar" id="btnSalvarNovoCliente">Salvar</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("btnSalvarNovoCliente").addEventListener("click", () => {
    const payload = {
      nome: document.getElementById("novoNome").value,
      sobrenome: document.getElementById("novoSobrenome").value,
      cpf_cnpj: document.getElementById("novoCpfCnpj").value,
      email: document.getElementById("novoEmail").value,
      senha: document.getElementById("novoSenha").value,
      telefone: document.getElementById("novoTelefone").value,
      endereco: document.getElementById("novoEndereco").value,
      cep: document.getElementById("novoCep").value
    };

    if (Object.values(payload).some(val => val.trim() === "")) {
      alert("Preencha todos os campos!");
      return;
    }

    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => {
        alert("Cliente cadastrado com sucesso!");
        document.body.removeChild(document.getElementById("overlay-novo-cliente"));
        document.getElementById("btnBuscarClienteAdm").click();
      });
  });
});

// ABRIR TELA CADASTRAR PET (Etapa 1)
document.getElementById("abrirCadastroPet").addEventListener("click", () => {
  limparEtapas();
  document.getElementById("overlay-cadastro-pet-etapa1").classList.add("ativo");
  document.getElementById("listaClientesPet").innerHTML = "";
  document.getElementById("btnContinuarCadastroPet").classList.add("escondido");
});

// BUSCAR CLIENTE PARA CADASTRAR PET
document.getElementById("btnBuscarClientePet").addEventListener("click", () => {
  const termo = document.getElementById("inputBuscaClientePet").value.trim();
  if (!termo) return;

  fetch(`http://localhost:3000/api/admin/clientes?buscar=${encodeURIComponent(termo)}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => res.json())
    .then(clientes => {
      const lista = document.getElementById("listaClientesPet");
      lista.innerHTML = "";

      clientes.forEach(cliente => {
        const div = document.createElement("div");
        div.className = "resultado-item";
        div.dataset.id = cliente.id;
        div.dataset.nome = cliente.nome;
        div.dataset.sobrenome = cliente.sobrenome;
        div.dataset.imagem = cliente.imagem || 'cliente.jpg';
        div.innerHTML = `
          <img src="/uploads/${cliente.imagem || 'cliente.jpg'}" />
          <div>
            <p><strong>${cliente.nome} ${cliente.sobrenome || ""}</strong></p>
            <p>Email: ${cliente.email}</p>
            <p>CPF/CNPJ: ${cliente.cpf_cnpj}</p>
            <p>Telefone: ${cliente.telefone}</p>
          </div>
        `;
        div.addEventListener("click", () => {
          document.querySelectorAll("#listaClientesPet .resultado-item").forEach(i => i.classList.remove("selecionado"));
          div.classList.add("selecionado");
          window.clienteSelecionadoPet = cliente;
          document.getElementById("btnContinuarCadastroPet").classList.remove("escondido");
        });
        lista.appendChild(div);
      });
    });
});

// CONTINUAR PARA TELA DE PETS DO CLIENTE
document.getElementById("btnContinuarCadastroPet").addEventListener("click", () => {
  if (!window.clienteSelecionadoPet) return;

  document.getElementById("overlay-cadastro-pet-etapa1").classList.remove("ativo");
  document.getElementById("overlay-cadastro-pet-etapa2").classList.add("ativo");

  document.getElementById("fotoClientePet").src = `/uploads/${window.clienteSelecionadoPet.imagem || 'cliente.jpg'}`;
  document.getElementById("nomeClientePet").textContent = `${window.clienteSelecionadoPet.nome} ${window.clienteSelecionadoPet.sobrenome}`;

  fetch(`http://localhost:3000/api/pets/${window.clienteSelecionadoPet.id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => res.json())
    .then(pets => {
      const lista = document.getElementById("listaPetsClienteCadastro");
      lista.innerHTML = "";

      pets.forEach(pet => {
        const div = document.createElement("div");
        div.className = "resultado-item";
        div.innerHTML = `
          <img src="/uploads/${pet.imagem || 'pet.png'}" />
          <div>
            <p><strong>${pet.nome}</strong></p>
            <p>${pet.idade} anos - ${pet.genero}</p>
            <p>${pet.raca}</p>
          </div>
          <button class="btn-editar-pet" 
            data-id="${pet.id}"
            data-nome="${pet.nome}"
            data-idade="${pet.idade}"
            data-genero="${pet.genero}"
            data-raca="${pet.raca}"
            data-nascimento="${pet.data_nascimento}">
            ✏️
          </button>
        `;
        lista.appendChild(div);
      });

      document.querySelectorAll(".btn-editar-pet").forEach(btn => {
        btn.addEventListener("click", () => {
          abrirFormularioPet("editar", btn.dataset);
        });
      });
    });
});

// ABRIR FORMULÁRIO PARA NOVO PET
document.getElementById("btnAbrirFormularioPet").addEventListener("click", () => {
  abrirFormularioPet("novo");
});

// CRIAR FORMULÁRIO DE PET
function abrirFormularioPet(tipo, dados = {}) {
  document.getElementById("overlay-cadastro-pet-etapa2").classList.remove("ativo");
  document.getElementById("overlay-formulario-pet").classList.add("ativo");

  // Preenche campos se estiver editando
  document.getElementById("petNome").value = dados.nome || "";
  document.getElementById("petIdade").value = dados.idade || "";
  document.getElementById("petRaca").value = dados.raca || "";
  document.getElementById("petNascimento").value = dados.nascimento || "";
  document.getElementById("petGenero").value = dados.genero || "";

  // Dados do cliente
  document.getElementById("imagemClientePetResumo").src = `/uploads/${window.clienteSelecionadoPet.imagem || 'cliente.jpg'}`;
  document.getElementById("nomeClientePetResumo").textContent = `${window.clienteSelecionadoPet.nome} ${window.clienteSelecionadoPet.sobrenome}`;

  const salvarBtn = document.getElementById("btnSalvarPet");
  salvarBtn.disabled = true;

  // Habilita salvar só se todos os campos estiverem preenchidos
  document.querySelectorAll("#overlay-formulario-pet input, #overlay-formulario-pet select").forEach(input => {
    input.addEventListener("input", () => {
      const nome = document.getElementById("petNome").value.trim();
      const idade = document.getElementById("petIdade").value.trim();
      const raca = document.getElementById("petRaca").value.trim();
      const nascimento = document.getElementById("petNascimento").value.trim();
      const genero = document.getElementById("petGenero").value.trim();
      salvarBtn.disabled = !(nome && idade && raca && nascimento && genero);
    });
  });

  salvarBtn.onclick = () => {
    const payload = {
      user_id: window.clienteSelecionadoPet.id,
      nome: document.getElementById("petNome").value,
      idade: document.getElementById("petIdade").value,
      raca: document.getElementById("petRaca").value,
      nascimento: document.getElementById("petNascimento").value,
      genero: document.getElementById("petGenero").value
    };

    const method = tipo === "editar" ? "PUT" : "POST";
    const url = tipo === "editar"
      ? `http://localhost:3000/api/pets/${dados.id}`
      : `http://localhost:3000/api/pets`;
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(() => {
          alert(tipo === "editar" ? "Pet atualizado!" : "Pet cadastrado!");
          document.getElementById("overlay-formulario-pet").classList.remove("ativo");
          document.getElementById("overlay-cadastro-pet-etapa2").classList.add("ativo");
      
          // CORRIGIDO: rota certa para listar os pets do cliente
          fetch(`http://localhost:3000/api/admin/pets/${window.clienteSelecionadoPet.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
            .then(res => res.json())
            .then(pets => {
              const lista = document.getElementById("listaPetsClienteCadastro");
              lista.innerHTML = "";
      
              pets.forEach(pet => {
                const div = document.createElement("div");
                div.className = "resultado-item";
                div.innerHTML = `
                  <img src="/uploads/${pet.imagem || 'pet.png'}" />
                  <div>
                    <p><strong>${pet.nome}</strong></p>
                    <p>${pet.idade} anos - ${pet.genero}</p>
                    <p>${pet.raca}</p>
                  </div>
                  <button class="btn-editar-pet" 
                    data-id="${pet.id}"
                    data-nome="${pet.nome}"
                    data-idade="${pet.idade}"
                    data-genero="${pet.genero}"
                    data-raca="${pet.raca}"
                    data-nascimento="${pet.data_nascimento}">
                    ✏️
                  </button>
                `;
                lista.appendChild(div);
              });
      
              document.querySelectorAll(".btn-editar-pet").forEach(btn => {
                btn.addEventListener("click", () => {
                  abrirFormularioPet("editar", btn.dataset);
                });
              });
            });
        });
  }
}