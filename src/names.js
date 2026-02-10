const colorsData = [
    { id: 'color-1', name: 'Vermelho', rgb: [255, 0, 0], hex: '#FF0000' },
    { id: 'color-2', name: 'Azul', rgb: [0, 0, 255], hex: '#0000FF' },
    { id: 'color-3', name: 'Amarelo', rgb: [255, 255, 0], hex: '#FFFF00' },
    { id: 'color-4', name: 'Verde', rgb: [0, 128, 0], hex: '#008000' },
    { id: 'color-5', name: 'Laranja', rgb: [255, 165, 0], hex: '#FFA500' },
    { id: 'color-6', name: 'Roxo', rgb: [128, 0, 128], hex: '#800080' },
    { id: 'color-7', name: 'Rosa', rgb: [255, 192, 203], hex: '#FFC0CB' }
];

export function renderColors() {
    const palette = document.getElementById('color-palette');
    
    colorsData.forEach(color => {
        const container = document.createElement('div');
        container.className = 'color-container';
        
        container.innerHTML = `
            <button id="${color.id}" class="colors" style="background-color: ${color.hex}"></button>
            <div class="color-info">
                <p class="color-name">${color.name}</p>
                <p class="color-codes">RGB: ${color.rgb.join(', ')}</p>
                <p class="color-codes">HEX: ${color.hex}</p>
            </div>
        `;
        
        palette.appendChild(container);
    });
}