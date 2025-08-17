/**
 * Maneja la visualización detallada de un menú específico
 * Se usa cuando se accede a un menú directamente por URL
 */

class MenuDetail {
  constructor(menuData) {
    this.menuData = menuData;
    this.init();
  }

  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const date = urlParams.get('date');
    const mealType = urlParams.get('meal');

    if (date && mealType) {
      this.showMenuDetail(date, mealType);
    } else {
      this.showNotFound();
    }
  }

  showMenuDetail(date, mealType) {
    const menu = this.menuData.find(m => m.date === date);

    if (!menu) {
      this.showNotFound();
      return;
    }

    const meal = mealType === 'breakfast' ? menu.breakfast : menu.lunch;

    if (!meal) {
      this.showNotFound();
      return;
    }

    document.getElementById('meal-detail-container').innerHTML = `
      <div class="detail-header">
        <h1>${mealType === 'breakfast' ? 'Desayuno' : 'Almuerzo'} - ${menu.day}, ${this.formatDisplayDate(menu.date)}</h1>
        <div class="detail-meta">
          <span class="time">${meal.start} - ${meal.end}</span>
          <span class="cook">Cocinera: ${menu.cook}</span>
          <span class="helpers">Ayudantes: ${menu.helpers.names.join(' y ')} (${menu.helpers.grade})</span>
        </div>
      </div>
      
      <div class="detail-content">
        <div class="detail-image">
          <img src="${meal.image}" alt="${meal.name}">
        </div>
        
        <div class="detail-info">
          <h2>${meal.name}</h2>
          <p class="description">${meal.description}</p>
          
          <div class="ingredients-section">
            <h3>Ingredientes</h3>
            <ul class="ingredients-list">
              ${meal.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>
          
          ${meal.additional ? `
          <div class="additional-section">
            <h3>Adicional</h3>
            <p>${meal.additional}</p>
          </div>
          ` : ''}
        </div>
      </div>
      
      <div class="detail-actions">
        <a href="menu.html" class="btn-back">Volver al menú semanal</a>
      </div>
    `;
  }

  showNotFound() {
    document.getElementById('meal-detail-container').innerHTML = `
      <div class="not-found">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2>Menú no encontrado</h2>
        <p>El menú solicitado no está disponible o no existe.</p>
        <a href="menu.html" class="btn-back">Volver al menú semanal</a>
      </div>
    `;
  }

  formatDisplayDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new MenuDetail(weeklyMenu);
});