const axios = window.axios;

const getHeroes = () => {
    axios
        .get('/api/heroes')
        .then(res => {
            const list = res.data.map(heroRow => (
                `<li>
                    ${heroRow.name}
                    <button type="button" onclick="deleteHero(${heroRow.hero_id})">
                        Delete
                    </button>
                    <button type="button" onclick="updateHero(${heroRow.hero_id}, '${heroRow.name}')">
                        Update
                    </button>
                </li>`
            )).join('\n');
            document.querySelector('#heroes-list').innerHTML = list;
        })
        .catch(err => console.log(err));
};

const addHero = e => {
    e.preventDefault();
    const name = document.querySelector('#hero-name').value;
    if (name) {
        addHeroForm.reset();
        axios 
            .post('/api/heroes', { name: name })
            .then(res => {
                getHeroes();
            })
            .catch(err => console.log(err));
    }
};

const updateHero = (id, defaultName) => {
    const updatedName = prompt('Enter a new name for the hero:', defaultName);
    if (updatedName && updatedName !== defaultName) {
        axios 
            .patch(`/api/heroes/${id}`, { name: updatedName })
            .then(res => getHeroes())
            .catch(err => console.log(err));
    }
};

const deleteHero = id => {
    axios  
        .delete(`/api/heroes/${id}`)
        .then(res => getHeroes())
        .catch(err => console.log(err));
};

const addHeroForm = document.querySelector('#add-hero-form');
addHeroForm.addEventListener('submit', addHero);

getHeroes();