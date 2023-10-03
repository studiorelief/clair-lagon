// Toggle Message error

function messageHero(): void {
  const rangeSliderElement = document.querySelector('#variable-rangeslider');
  const warningMessage = document.querySelector('#variable-message-low');

  if (!rangeSliderElement || !warningMessage) {
    return;
  }

  const observer = new MutationObserver(() => {
    const rangeSliderValue = rangeSliderElement.textContent;

    if (rangeSliderValue) {
      // Supprimez les espaces et les caractères non numériques
      const cleanedValue = rangeSliderValue.replace(/\D/g, '');
      const value = parseInt(cleanedValue, 10);

      if (value < 1000) {
        warningMessage.classList.remove('hide');
      } else {
        warningMessage.classList.add('hide');
      }
    }
  });

  observer.observe(rangeSliderElement, { childList: true, characterData: true, subtree: true });
}

// Valeur plage

function plageHero(): void {
  const rangeSliderElement = document.querySelector('#variable-rangeslider');
  const plageElement = document.querySelector('#variable-surface-plage');

  if (!rangeSliderElement || !plageElement) {
    return;
  }

  const observer = new MutationObserver(() => {
    const rangeSliderValue = rangeSliderElement.textContent;

    if (rangeSliderValue) {
      const cleanedValue = parseInt(rangeSliderValue.replace(/\D/g, ''), 10);
      const plageValue = cleanedValue * 0.5; // 50% de la valeur
      plageElement.textContent = plageValue.toString();
    }
  });

  observer.observe(rangeSliderElement, { childList: true, characterData: true, subtree: true });
}

// Valeur eau

function eauHero(): void {
  const rangeSliderElement = document.querySelector('#variable-rangeslider');
  const eauElement = document.querySelector('#variable-surface-eau');

  if (!rangeSliderElement || !eauElement) {
    return;
  }

  const observer = new MutationObserver(() => {
    const rangeSliderValue = rangeSliderElement.textContent;

    if (rangeSliderValue) {
      const cleanedValue = parseInt(rangeSliderValue.replace(/\D/g, ''), 10);
      const eauValue = cleanedValue * 0.3; // 30% de la valeur
      eauElement.textContent = eauValue.toString();
    }
  });

  observer.observe(rangeSliderElement, { childList: true, characterData: true, subtree: true });
}

// Valeur total

function totalHero(): void {
  const plageElement = document.querySelector('#variable-surface-plage');
  const eauElement = document.querySelector('#variable-surface-eau');
  const totalElement = document.querySelector('#variable-surface-totale');

  if (!plageElement || !eauElement || !totalElement) {
    return;
  }

  const cleanValue = (str: string | null) => {
    if (!str) return 0;
    const cleaned = str.replace(/\s+/g, '').replace(',', '.');
    return parseFloat(cleaned);
  };

  const updateTotal = () => {
    const plageValue = cleanValue(plageElement.textContent);
    const eauValue = cleanValue(eauElement.textContent);
    const totalValue = plageValue + eauValue;
    totalElement.textContent = Math.round(totalValue).toString(); // Arrondit à l'entier le plus proche
  };

  const observerPlage = new MutationObserver(updateTotal);
  const observerEau = new MutationObserver(updateTotal);

  observerPlage.observe(plageElement, { childList: true, characterData: true, subtree: true });
  observerEau.observe(eauElement, { childList: true, characterData: true, subtree: true });
}

// Duplicate Data in Form

function dataMirrorHero(): void {
  // Liste des sélecteurs pour les éléments X et Y
  const mappings = [
    { x: '#variable-surface-plage', y: '#variable-surface-plage-input' },
    { x: '#variable-surface-eau', y: '#variable-surface-eau-input' },
    { x: '#variable-surface-totale', y: '#variable-surface-totale-input' },
    { x: '#variable-rangeslider', y: '#variable-surface-superficie-input' },
  ];

  mappings.forEach((mapping) => {
    const xElement = document.querySelector(mapping.x);
    const yElement = document.querySelector(mapping.y) as HTMLInputElement; // Cast en tant qu'HTMLInputElement pour accéder à la propriété value

    if (!xElement || !yElement) {
      return;
    }

    const observer = new MutationObserver(() => {
      const xValue = xElement.textContent;
      if (xValue) {
        yElement.value = xValue;
      }
    });

    observer.observe(xElement, { childList: true, characterData: true, subtree: true });
  });
}

// Appel de la fonction
export { dataMirrorHero, eauHero, messageHero, plageHero, totalHero };
