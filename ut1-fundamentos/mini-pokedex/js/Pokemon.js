class Pokemon {
  constructor(datos) {
    this.id = datos.id;
    this.nombre = datos.name;

    this.imagen = datos.sprites.front_default;
    this.imagenShiny = datos.sprites.front_shiny;

    this.imagenEspalda = datos.sprites.back_default;
    this.imagenEspaldaShiny = datos.sprites.back_shiny;

    this.altura = datos.height;
    this.peso = datos.weight;

    this.tipos = datos.types.map((tipo) => tipo.type.name);

    this.habilidades = datos.abilities.map(
      (habilidad) => habilidad.ability.name
    );

    this.ps = datos.stats.find(
      (estadistica) => estadistica.stat.name === "hp"
    ).base_stat;

    this.experiencia = datos.base_experience;

    this.estadisticas = datos.stats;
  }
}