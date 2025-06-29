import Chart from "chart.js/auto";

export async function carregarGraficos(eventosRef, arrecadacaoRef, destaqueLucroRef, eventosContainerRef) {
  // --- MOCK Gráfico Eventos ---
  const eventosFake = {
    labels: ["Feira", "Palestra", "Curso", "Workshop"],
    valores: [12, 8, 5, 15],
    cores: ["#FFD1DC", "#FF9EB2", "#FF7B9C" , "#FF4D6D"],
  };

  new Chart(eventosRef.current, {
    type: "bar",
    data: {
      labels: eventosFake.labels,
      datasets: [
        { data: eventosFake.valores, backgroundColor: eventosFake.cores }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });

  // --- MOCK Gráfico Arrecadação ---
  const arrecadacaoFake = {
    labels: ["Jan", "Fev", "Mar", "Abr"],
    valores: [1000, 3000, 2000 , 5500],
    cores: ["#F28B82", "#FBBC05", "#34A853", "#4285F4"],
    maior: {
      valor: 5500,
      mes: "Abril",
      ano: "2024",
      cor: "#FF4D6D"
    }
  };

  new Chart(arrecadacaoRef.current, {
    type: "bar",
    data: {
      labels: arrecadacaoFake.labels,
      datasets: [
        { data: arrecadacaoFake.valores, backgroundColor: arrecadacaoFake.cores }
      ]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `R$ ${ctx.raw.toLocaleString("pt-BR")}`
          }
        }
      }
    }
  });

  if (destaqueLucroRef?.current) {
    destaqueLucroRef.current.innerHTML = `
      R$ ${arrecadacaoFake.maior.valor.toLocaleString("pt-BR")}<br>
      <small>${arrecadacaoFake.maior.mes} ${arrecadacaoFake.maior.ano}</small>
    `;
    destaqueLucroRef.current.style.background = arrecadacaoFake.maior.cor;
  }

  // --- MOCK Próximos Eventos ---
  if (eventosContainerRef?.current) {
    eventosContainerRef.current.innerHTML = `
      <div class="event-card">
        <div class="event-image">
          <img src="https://tse4.mm.bing.net/th/id/OIP.uPorqYq6ft-IhMe6SFdnvwHaE8?cb=iwp2&rs=1&pid=ImgDetMain" alt="Imagem do Evento" style="border-radius: 10px; width: 400px; height: 200px;">
        </div>
        <div class="event-content">
          <h4 class="event-title">Curso de Banco de Dados</h4> 
            <p class="event-date">Data: 12/06/2025</p>
            <p class="event-description">Descrição de teste sem API</p>
        </div>
        </div>

        <div class="event-card">
        <div class="event-image">
          <img src="https://ichi.pro/assets/images/max/724/1*RJMxLdTHqVBSijKmOO5MAg.jpeg" alt="Imagem do Evento" style="border-radius: 10px;  width: 400px; height: 200px;">
        </div>
        <div class="event-content">
          <h4 class="event-title">Curso de Phyton</h4> 
            <p class="event-date">Data: 22/07/2025</p>
            <p class="event-description">Descrição de teste sem API</p>
        </div>
      </div>

       <div class="event-card">
        <div class="event-image">
          <img src="https://th.bing.com/th/id/OIP.ouIzwLtycFBEftuJEw4J5gHaE8?o=7&cb=iwp2rm=3&rs=1&pid=ImgDetMain" alt="Imagem do Evento" style="border-radius: 10px;  width: 400px; height: 200px;">
        </div>
        <div class="event-content">
          <h4 class="event-title">Palestra - Entendendo o Mercado de Trabalho</h4> 
            <p class="event-date">Data: 25/07/2025</p>
            <p class="event-description">Descrição de teste sem API</p>
        </div>
      </div>`

  }
}
