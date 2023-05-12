


function calcular(){

  function f(t, y) {
    return r * y * (1 - y / K);
  }
  
  function rungeKutta(t, y, h) {
    const k1 = h * f(t, y);
    const k2 = h * f(t + h / 2, y + k1 / 2);
    const k3 = h * f(t + h / 2, y + k2 / 2);
    const k4 = h * f(t + h, y + k3);
    const ynew = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    return ynew;
  }


  var cres  = document.getElementById('cres')
  var sup = document.getElementById('sup')
  var pop = document.getElementById('pop')
  var ini = document.getElementById('ini')
  var fim = document.getElementById('fim')
  var passo = document.getElementById('passo')

  var r = Number(cres.value)
  var k = Number(sup.value)
  var y0 = Number(pop.value)
  var t0 = Number( ini.value)
  var tf = Number(fim.value)
  var h = Number(passo.value)

  const t = [];
const y = [];
let currentT = t0;
let currentY = y0;

while (currentT <= tf) {
  t.push(currentT);
  y.push(currentY);
  currentY = rungeKutta(currentT, currentY, h);
  currentT += h;
}

const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: t,
    datasets: [
      {
        label: 'Densidade populacional',
        data: y,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  },
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tempo (dias)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Densidade populacional'
        }
      }
    }
  }
});

}