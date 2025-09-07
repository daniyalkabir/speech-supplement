document.addEventListener('DOMContentLoaded', () => {
    // Load configuration and build the page
    fetch('config.json')
        .then(res => res.json())
        .then(config => initGallery(config))
        .catch(err => {
            console.error('Error loading config:', err);
        });

    // Close modal when clicking close button
    const closeBtn = document.getElementById('modal-close');
    closeBtn.addEventListener('click', closeModal);
});

/**
 * Build all parts of the gallery given the configuration.
 * @param {Array<{id: string, text: string}>} config 
 */
function initGallery(config) {
    // Build chips
    const chipsContainer = document.getElementById('chips-container');
    config.forEach(item => {
        const chip = document.createElement('span');
        chip.classList.add('chip');
        chip.textContent = item.text;
        chip.dataset.target = item.id;
        chip.addEventListener('click', () => openModal(item));
        chipsContainer.appendChild(chip);
    });

    const ecapaGrid = document.getElementById('ecapa-grid');
    const resnetGrid = document.getElementById('resnet-grid');
    const scatterGrid = document.getElementById('scatter-grid');
    const audioGrid = document.getElementById('audio-grid');

    config.forEach(item => {
        // Create card for ECAPA graph
        const ecapaCard = createImageCard(item, 'ecapa', `${item.text}`);
        ecapaGrid.appendChild(ecapaCard);

        // Create card for ResNet graph
        const resnetCard = createImageCard(item, 'resnet', `${item.text}`);
        resnetGrid.appendChild(resnetCard);

        // Create card for scatter plot
        const scatterCard = createImageCard(item, 'scatter', `${item.text}`);
        scatterGrid.appendChild(scatterCard);

        // Create card for audio
        const audioCard = createAudioCard(item);
        audioGrid.appendChild(audioCard);
    });
}

/**
 * Create a card element containing an image for a specific target and category.
 * If the image fails to load, the card will be hidden.
 * @param {{id:string, text:string}} item
 * @param {string} category - 'ecapa', 'resnet', or 'scatter'
 * @param {string} caption
 * @returns {HTMLElement}
 */
function createImageCard(item, category, caption) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = `assets/images/${category}/${item.id}.png`;
    img.alt = `${item.text} ${category} graph`;
    img.onerror = () => {
        card.style.display = 'none';
    };
    card.appendChild(img);

    const text = document.createElement('p');
    text.textContent = caption;
    card.appendChild(text);

    return card;
}

/**
 * Create a card element containing audio players for original and adversarial samples.
 * If an audio file is missing, its player is hidden.
 * @param {{id:string, text:string}} item
 * @returns {HTMLElement}
 */
function createAudioCard(item) {
    const card = document.createElement('div');
    card.classList.add('card', 'audio-card');

    const title = document.createElement('p');
    title.textContent = item.text;
    card.appendChild(title);

    const origLabel = document.createElement('p');
    origLabel.textContent = 'Original';
    origLabel.style.marginBottom = '0.2rem';
    card.appendChild(origLabel);
    const origAudio = document.createElement('audio');
    origAudio.controls = true;
    origAudio.src = `assets/audio/${item.id}/original.wav`;
    origAudio.onerror = () => {
        origAudio.style.display = 'none';
    };
    card.appendChild(origAudio);

    const advLabel = document.createElement('p');
    advLabel.textContent = 'Adversarial';
    advLabel.style.marginTop = '0.5rem';
    advLabel.style.marginBottom = '0.2rem';
    card.appendChild(advLabel);
    const advAudio = document.createElement('audio');
    advAudio.controls = true;
    advAudio.src = `assets/audio/${item.id}/adversarial.wav`;
    advAudio.onerror = () => {
        advAudio.style.display = 'none';
    };
    card.appendChild(advAudio);

    return card;
}

/**
 * Open a modal displaying detailed graphs and audio for the selected target.
 * @param {{id:string, text:string}} item
 */
function openModal(item) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    body.innerHTML = '';

    const title = document.createElement('h3');
    title.textContent = item.text;
    body.appendChild(title);

    // Larger images for each category
    ['ecapa', 'resnet', 'scatter'].forEach(category => {
        const img = document.createElement('img');
        img.src = `assets/images/${category}/${item.id}.png`;
        img.alt = `${item.text} ${category} graph`;
        img.style.width = '100%';
        img.style.marginBottom = '1rem';
        img.onerror = () => {
            img.remove();
        };
        body.appendChild(img);
    });

    // Audio players
    const audioContainer = document.createElement('div');
    audioContainer.classList.add('audio-card');

    const oLabel = document.createElement('p');
    oLabel.textContent = 'Original:';
    audioContainer.appendChild(oLabel);
    const oAudio = document.createElement('audio');
    oAudio.controls = true;
    oAudio.src = `assets/audio/${item.id}/original.wav`;
    oAudio.onerror = () => {
        oAudio.remove();
    };
    audioContainer.appendChild(oAudio);

    const aLabel = document.createElement('p');
    aLabel.textContent = 'Adversarial:';
    aLabel.style.marginTop = '0.5rem';
    audioContainer.appendChild(aLabel);
    const aAudio = document.createElement('audio');
    aAudio.controls = true;
    aAudio.src = `assets/audio/${item.id}/adversarial.wav`;
    aAudio.onerror = () => {
        aAudio.remove();
    };
    audioContainer.appendChild(aAudio);

    body.appendChild(audioContainer);

    modal.style.display = 'flex';
}

/**
 * Hide the modal overlay.
 */
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}