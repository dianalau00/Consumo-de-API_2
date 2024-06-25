document.getElementById('btn-buscar').addEventListener('click', async function() 
{
    const inputValue = document.getElementById('pokemon-id').value.trim();
    
    if (!inputValue) {
        alert('Por favor ingresa un nombre o número de Pokémon válido.');
        return;
    }

    try {
        let url;
        // Verificar si el input es un número (ID) o un nombre
        if (!isNaN(inputValue)) {
            // Si es un número (ID)
            url = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;
        } else {
            // Si es un nombre
            url = `https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        const nombre = data.name.toUpperCase();
        const imagen = data.sprites.other['official-artwork'].front_default;
        const tipos = data.types.map(type => type.type.name).join(', ');
        const habilidades = data.abilities.map(ability => ability.ability.name).join(', ');
        const peso = data.weight / 10; // Convertir a kg
        const altura = data.height / 10; // Convertir a metros
        const stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>');

        const resultHTML = `
            <h2>${nombre}</h2>
            <img src="${imagen}" alt="${nombre}">
            <p><strong>Tipo(s):</strong> ${tipos}</p>
            <p><strong>Habilidades:</strong> ${habilidades}</p>
            <p><strong>Peso:</strong> ${peso} kg</p>
            <p><strong>Altura:</strong> ${altura} m</p>
            <p><strong>Estadísticas:</strong><br> ${stats}</p>
        `;

        document.getElementById('poke-result').innerHTML = resultHTML;
    } catch (error) {
        console.error('Error al buscar Pokémon:', error);
        alert('No se encontró ningún Pokémon con ese nombre o número. Por favor intenta de nuevo.');
    }
});