document.addEventListener("DOMContentLoaded", async () => {
  // === PAGINA HOME (Dashboard Admin) === //
  const ctxEventos = document.getElementById("graficoEventos");
  const legendaEventos = document.getElementById("legendaGraficoEventos");
  const ctxArrecadacao = document.getElementById("graficoArrecadacao");
  const destaqueLucro = document.getElementById("destaqueLucro");
  const eventosContainer = document.getElementById("proximosEventos");

  function mostrarMensagemIndisponivel(canvasEl, mensagem) {
    const container = canvasEl.parentElement;
    canvasEl.remove();
    const msg = document.createElement("div");
    msg.textContent = mensagem;
    msg.style.textAlign = "center";
    msg.style.padding = "100px 10px";
    msg.style.color = "#999";
    msg.style.fontWeight = "bold";
    container.appendChild(msg);
  }

  // --- Gráfico Eventos/Projetos ---
  try {
    const res = await fetch("/api/graficos/eventos");
    const dadosEventos = await res.json();

    if (dadosEventos?.labels?.length) {
      legendaEventos.style.display = "block";

      new Chart(ctxEventos, {
        type: "bar",
        data: {
          labels: dadosEventos.labels,
          datasets: [{
            data: dadosEventos.valores,
            backgroundColor: dadosEventos.cores
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } }
        }
      });
    } else {
      mostrarMensagemIndisponivel(ctxEventos, "Informações indisponíveis");
      legendaEventos.style.display = "none";
    }
  } catch (err) {
    console.error(err);
    mostrarMensagemIndisponivel(ctxEventos, "Informações indisponíveis");
    legendaEventos.style.display = "none";
  }

  // --- Gráfico Arrecadações ---
  try {
    const res = await fetch("/api/graficos/arrecadacoes");
    const dados = await res.json();

    if (dados?.labels?.length) {
      new Chart(ctxArrecadacao, {
        type: "bar",
        data: {
          labels: dados.labels,
          datasets: [{
            data: dados.valores,
            backgroundColor: dados.cores
          }]
        },
        options: {
          indexAxis: "y",
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => `R$ ${ctx.raw.toLocaleString("pt-BR")}`
              }
            }
          }
        }
      });

      destaqueLucro.innerHTML = `
        R$ ${dados.maior.valor.toLocaleString("pt-BR")}<br>
        <small>${dados.maior.mes} ${dados.maior.ano}</small>
      `;
      destaqueLucro.style.background = dados.maior.cor;
    } else {
      mostrarMensagemIndisponivel(ctxArrecadacao, "Informações indisponíveis");
      destaqueLucro.remove();
    }
  } catch (err) {
    console.error(err);
    mostrarMensagemIndisponivel(ctxArrecadacao, "Informações indisponíveis");
    destaqueLucro.remove();
  }

  // --- Próximos Eventos ---
  try {
    const res = await fetch("/api/eventos/proximos");
    const eventos = await res.json();

    if (eventos.length) {
      eventos.forEach(evt => {
        const div = document.createElement("div");
        div.className = "event-card";
        div.innerHTML = `
          <div class="event-image">
            <img src="${evt.imagem}" alt="Imagem do Evento">
          </div>
          <div class="event-content">
            <h4 class="event-title">${evt.titulo}</h4>
            <p class="event-description">${evt.descricao}</p>
          </div>
        `;
        eventosContainer.appendChild(div);
      });
    } else {
      eventosContainer.innerHTML = `<p style="text-align: center; width: 100%; padding: 40px 0; color: #999; font-weight: bold;">Nenhum evento disponível.</p>`;
    }
  } catch (err) {
    console.error(err);
    eventosContainer.innerHTML = `<p style="text-align: center; width: 100%; padding: 40px 0; color: #999; font-weight: bold;">Informações indisponíveis.</p>`;
  }
});

// === PAGINA DE ACESSO === //
document.addEventListener("DOMContentLoaded", () => {
  const tabelaBody = document.getElementById("tabela-acesso-body");

  const usuarios = [
    { id: 1, nome: "João Silva", email: "joao@email.com", acesso: true },
    { id: 2, nome: "Maria Souza", email: "maria@email.com", acesso: false }
  ];

  usuarios.forEach(usuario => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td>
        <label class="switch">
          <input type="checkbox" ${usuario.acesso ? "checked" : ""} data-id="${usuario.id}">
          <span class="slider"></span>
        </label>
      </td>
    `;
    tabelaBody.appendChild(tr);
  });

  tabelaBody.addEventListener("change", async (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      const userId = e.target.getAttribute("data-id");
      const novoStatus = e.target.checked;

      try {
        await fetch("/api/usuarios/acesso", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId, permitir: novoStatus })
        });
        console.log("Atualização enviada com sucesso.");
      } catch (error) {
        console.error("Erro ao atualizar acesso:", error);
      }
    }
  });
});

// === PAGINA CONFIGURAÇÕES === //
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/usuario-logado");
    const user = await res.json();

    document.getElementById("nomeUsuario").textContent = user.nome;
    document.getElementById("fotoUsuario").src = user.foto || "/Front-End/imagens/user.svg";
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  }
});

// === PAGINA DADOS === //
let cropper;

document.addEventListener("DOMContentLoaded", async () => {
  const nome = document.getElementById("nome");
  const email = document.getElementById("sobrenome");
  const celular = document.getElementById("celular");
  const documento = document.getElementById("documento");
  const endereco = document.getElementById("endereco");
  const cep = document.getElementById("cep");
  const fotoUsuario = document.getElementById("fotoUsuario");

  try {
    const response = await fetch("/api/usuario-logado");
    const user = await response.json();

    nome.value = user.nome || "";
    email.value = user.sobrenome || "";
    celular.value = user.telefone || "";
    documento.value = user.documento || "";
    endereco.value = user.endereco || "";
    cep.value = user.cep || "";
    fotoUsuario.src = user.foto || "/Front-End/imagens/user.svg";
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  }

  document.getElementById("btnSalvar").addEventListener("click", async () => {
    const body = {
      nome: nome.value,
      sobrenome: email.value,
      telefone: celular.value,
      documento: documento.value,
      endereco: endereco.value,
      cep: cep.value
    };

    try {
      const res = await fetch("/api/usuario-logado", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        alert("Dados atualizados com sucesso!");
      } else {
        alert("Erro ao salvar dados.");
      }
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  });

  document.getElementById("btnEditarFoto").addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("cropperImage").src = reader.result;
        document.getElementById("cropperModal").classList.remove("hidden");

        if (cropper) cropper.destroy();
        cropper = new Cropper(document.getElementById("cropperImage"), {
          aspectRatio: 1,
          viewMode: 1,
        });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  });

  document.getElementById("btnCropCancel").addEventListener("click", () => {
    cropper.destroy();
    document.getElementById("cropperModal").classList.add("hidden");
  });

  document.getElementById("btnCropSave").addEventListener("click", async () => {
    const canvas = cropper.getCroppedCanvas({ width: 300, height: 300 });
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg"));
    const formData = new FormData();
    formData.append("foto", blob);

    try {
      const res = await fetch("/api/usuario-logado/foto", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        const result = await res.json();
        fotoUsuario.src = result.url;
        alert("Foto atualizada!");
      } else {
        alert("Erro ao enviar a foto.");
      }
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
    }

    cropper.destroy();
    document.getElementById("cropperModal").classList.add("hidden");
  });

  document.getElementById("btnExcluirFoto").addEventListener("click", async () => {
    try {
      const res = await fetch("/api/usuario-logado/foto", { method: "DELETE" });

      if (res.ok) {
        fotoUsuario.src = "/Front-End/imagens/user.svg";
        alert("Foto removida.");
      } else {
        alert("Erro ao excluir foto.");
      }
    } catch (err) {
      console.error("Erro ao excluir imagem:", err);
    }
  });
});

// === PAGINA EMAIL/SENHA === //
document.getElementById("btnAlterarEmail")?.addEventListener("click", async () => {
  const novoEmail = document.getElementById("novoEmail").value.trim();
  const senha = document.getElementById("senhaAtualEmail").value.trim();

  if (!novoEmail || !senha) return alert("Preencha todos os campos para alterar o e-mail.");

  try {
    const res = await fetch("/api/usuario-logado/email", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ novoEmail, senha })
    });

    if (res.ok) {
      alert("E-mail atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar e-mail. Verifique os dados.");
    }
  } catch (err) {
    console.error("Erro:", err);
    alert("Erro ao conectar com o servidor.");
  }
});

document.getElementById("btnAlterarSenha")?.addEventListener("click", async () => {
  const atual = document.getElementById("senhaAtual").value.trim();
  const nova = document.getElementById("novaSenha").value.trim();
  const confirmacao = document.getElementById("confirmaSenha").value.trim();

  if (!atual || !nova || !confirmacao) {
    return alert("Preencha todos os campos para alterar a senha.");
  }

  if (nova !== confirmacao) {
    return alert("A nova senha e a confirmação não coincidem.");
  }

  try {
    const res = await fetch("/api/usuario-logado/senha", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ atual, nova })
    });

    if (res.ok) {
      alert("Senha alterada com sucesso!");
    } else {
      alert("Erro ao atualizar senha. Verifique os dados.");
    }
  } catch (err) {
    console.error("Erro:", err);
    alert("Erro ao conectar com o servidor.");
  }
});
