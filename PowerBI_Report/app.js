/*
===============================================================================
  SIMPLE BEGINNER-FRIENDLY CUSTOMER BEHAVIOR DASHBOARD LOGIC
===============================================================================
*/

let currentFilters = {
  membership: 'All',
  gender: 'All',
  cuisine: 'All',
  city: 'All'
};

let chartInstances = {};

// Number Formatters
const formatK = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const formatCurrency = (val) => '₹' + Number(val).toFixed(2);
const formatDecimal = (val) => Number(val).toFixed(2);

document.addEventListener('DOMContentLoaded', () => {
  initFilterControls();
  updateDashboard();

  // Export Data Button
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const data = getFilteredData();
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += Object.keys(data[0] || {}).join(",") + "\n";
      data.forEach(row => {
        csvContent += Object.values(row).map(v => `"${v}"`).join(",") + "\n";
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Food_Delivery_Customer_Behavior_Data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});

// Setup Click Handlers for Pill buttons & Radio buttons
function initFilterControls() {
  // Membership Pills
  document.querySelectorAll('#filterMembershipGroup .pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#filterMembershipGroup .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilters.membership = btn.getAttribute('data-val');
      updateDashboard();
    });
  });

  // Gender Pills
  document.querySelectorAll('#filterGenderGroup .pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#filterGenderGroup .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilters.gender = btn.getAttribute('data-val');
      updateDashboard();
    });
  });

  // Cuisine Stack Buttons
  document.querySelectorAll('#filterCuisineStack .pill-stack-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#filterCuisineStack .pill-stack-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilters.cuisine = btn.getAttribute('data-val');
      updateDashboard();
    });
  });

  // City Radio Buttons
  document.querySelectorAll('input[name="city"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentFilters.city = e.target.value;
      updateDashboard();
    });
  });

  // Reset Button
  const resetBtn = document.getElementById('resetAllFiltersBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFilters = { membership: 'All', gender: 'All', cuisine: 'All', city: 'All' };
      
      // Reset UI states
      document.querySelectorAll('#filterMembershipGroup .pill-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-val') === 'All');
      });
      document.querySelectorAll('#filterGenderGroup .pill-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-val') === 'All');
      });
      document.querySelectorAll('#filterCuisineStack .pill-stack-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-val') === 'All');
      });
      const defaultRadio = document.querySelector('input[name="city"][value="All"]');
      if (defaultRadio) defaultRadio.checked = true;

      updateDashboard();
    });
  }
}

// Filter dataset
function getFilteredData() {
  if (typeof RAW_FOOD_ORDERS === 'undefined') return [];
  return RAW_FOOD_ORDERS.filter(d => {
    if (d.order_status !== 'Delivered') return false; // Focus on delivered purchases
    if (currentFilters.membership === 'Yes' && !d.membership) return false;
    if (currentFilters.membership === 'No' && d.membership) return false;
    if (currentFilters.gender !== 'All' && d.gender !== currentFilters.gender) return false;
    if (currentFilters.cuisine !== 'All' && d.cuisine !== currentFilters.cuisine) return false;
    if (currentFilters.city !== 'All' && d.city !== currentFilters.city) return false;
    return true;
  });
}

// Helper to rebuild chart cleanly
function drawChart(canvasId, config) {
  if (chartInstances[canvasId]) {
    chartInstances[canvasId].destroy();
  }
  const ctx = document.getElementById(canvasId);
  if (ctx) {
    chartInstances[canvasId] = new Chart(ctx, config);
  }
}

// Update Dashboard Visuals & Cards
function updateDashboard() {
  const data = getFilteredData();

  // 1. Update Top KPI Cards
  const totalOrders = data.length;
  const avgAmount = totalOrders > 0 ? data.reduce((sum, d) => sum + (d.order_value || 0), 0) / totalOrders : 0;
  const avgRating = totalOrders > 0 ? data.reduce((sum, d) => sum + (d.customer_rating || 0), 0) / totalOrders : 0;

  document.getElementById('kpiTotalOrders').innerText = formatK(totalOrders);
  document.getElementById('kpiAvgAmount').innerText = formatCurrency(avgAmount);
  document.getElementById('kpiAvgRating').innerText = formatDecimal(avgRating);

  // 2. Chart 1: Donut Chart - % of Customers by Membership Status
  const memberCount = data.filter(d => d.membership).length;
  const nonMemberCount = totalOrders - memberCount;
  const memberPct = totalOrders > 0 ? Math.round((memberCount / totalOrders) * 100) : 0;
  const nonMemberPct = 100 - memberPct;

  drawChart('chartMembershipDonut', {
    type: 'doughnut',
    data: {
      labels: [`Yes ${memberPct}%`, `No ${nonMemberPct}%`],
      datasets: [{
        data: [memberCount, nonMemberCount],
        backgroundColor: ['#4338ca', '#e62678'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'left',
          labels: { font: { family: 'Inter', weight: 'bold' }, color: '#1e1b4b' }
        }
      },
      cutout: '70%'
    }
  });

  // 3. Chart 2: Vertical Bar Chart - Revenue by Category (Cuisine)
  const cuisineRevMap = {};
  data.forEach(d => {
    cuisineRevMap[d.cuisine] = (cuisineRevMap[d.cuisine] || 0) + (d.net_revenue || 0);
  });
  const cuisineLabels = Object.keys(cuisineRevMap).sort((a,b) => cuisineRevMap[b] - cuisineRevMap[a]).slice(0, 5);
  const cuisineRevValues = cuisineLabels.map(c => cuisineRevMap[c]);

  drawChart('chartRevenueByCuisine', {
    type: 'bar',
    data: {
      labels: cuisineLabels,
      datasets: [{
        data: cuisineRevValues,
        backgroundColor: '#252467',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 }, color: '#1e1b4b' } },
        y: {
          grid: { color: '#f1f5f9' },
          ticks: {
            font: { family: 'Inter', size: 10 }, color: '#64748b',
            callback: (v) => v >= 1000 ? (v/1000) + 'K' : v
          }
        }
      }
    }
  });

  // 4. Chart 3: Vertical Bar Chart - Sales Volume by Category (Cuisine)
  const cuisineSalesMap = {};
  data.forEach(d => {
    cuisineSalesMap[d.cuisine] = (cuisineSalesMap[d.cuisine] || 0) + 1;
  });
  const cuisineSalesValues = cuisineLabels.map(c => cuisineSalesMap[c] || 0);

  drawChart('chartSalesByCuisine', {
    type: 'bar',
    data: {
      labels: cuisineLabels,
      datasets: [{
        data: cuisineSalesValues,
        backgroundColor: '#252467',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 }, color: '#1e1b4b' } },
        y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'Inter', size: 10 }, color: '#64748b' } }
      }
    }
  });

  // 5. Chart 4: Horizontal Bar Chart - Revenue by Age Group
  const ageGroupLabels = ['Young Adult', 'Middle-aged', 'Adult', 'Senior'];
  const ageMapKey = {
    'Young Adult': '18-24',
    'Middle-aged': '25-34',
    'Adult': '35-44',
    'Senior': '45-60'
  };

  const ageRevMap = {};
  data.forEach(d => {
    ageRevMap[d.age_group] = (ageRevMap[d.age_group] || 0) + (d.net_revenue || 0);
  });
  const ageRevValues = ageGroupLabels.map(lbl => ageRevMap[ageMapKey[lbl]] || 0);

  drawChart('chartRevenueByAge', {
    type: 'bar',
    data: {
      labels: ageGroupLabels,
      datasets: [{
        data: ageRevValues,
        backgroundColor: '#252467',
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: '#f1f5f9' },
          ticks: {
            font: { family: 'Inter', size: 10 }, color: '#64748b',
            callback: (v) => v >= 1000 ? (v/1000) + 'K' : v
          }
        },
        y: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11, weight: '600' }, color: '#1e1b4b' } }
      }
    }
  });

  // 6. Chart 5: Horizontal Bar Chart - Sales Volume by Age Group
  const ageSalesMap = {};
  data.forEach(d => {
    ageSalesMap[d.age_group] = (ageSalesMap[d.age_group] || 0) + 1;
  });
  const ageSalesValues = ageGroupLabels.map(lbl => ageSalesMap[ageMapKey[lbl]] || 0);

  drawChart('chartSalesByAge', {
    type: 'bar',
    data: {
      labels: ageGroupLabels,
      datasets: [{
        data: ageSalesValues,
        backgroundColor: '#252467',
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'Inter', size: 10 }, color: '#64748b' } },
        y: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11, weight: '600' }, color: '#1e1b4b' } }
      }
    }
  });
}
