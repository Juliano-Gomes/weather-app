# UI Clone - 150 Day Challenges

Este projeto é um clone de interface desenvolvido como parte do desafio **150 Day Challenges**. O objetivo é aprimorar habilidades em desenvolvimento front-end, recriando interfaces modernas e responsivas.

## 🛠️ Stacks Utilizadas

- **React.js**  
  Biblioteca JavaScript para construção de interfaces de usuário.

- **TypeScript**  
  Superset do JavaScript que adiciona tipagem estática ao projeto.

- **Tailwindcss**  
  Framework utilitário para estilização rápida e responsiva.

- **Vite**  
  Ferramenta de build rápida para projetos modernos em front-end.

- **ESLint & Prettier**  
  Ferramentas para padronização e qualidade do código.

## 🌐 APIs Utilizadas

As APIs utilizadas neste projeto estão configuradas no arquivo `.env`. Certifique-se de definir as variáveis de ambiente corretamente para garantir o funcionamento das integrações. Exemplos de variáveis:

```env
VITE_API_COUNTRY="https://restcountries.com/v3.1/name"

VITE_WEATHER_TWO_URL="http://api.weatherstack.com/"
VITE_WEATHER_TWO_KEY=""

VITE_REVERSE_GEO_URL="https://geocode.maps.co/reverse"
VITE_REVERSE_GEO_KEY=""
```

- **Rest Countries API** (`VITE_API_COUNTRY`): Busca informações de países pelo nome.
- **Weatherstack API** (`VITE_WEATHER_TWO_URL`, `VITE_WEATHER_TWO_KEY`): Consulta dados meteorológicos atuais de cidades.
- **Maps.co Reverse Geocoding API** (`VITE_REVERSE_GEO_URL`, `VITE_REVERSE_GEO_KEY`): Realiza geocodificação reversa para obter informações de localização a partir de coordenadas.

Essas APIs são utilizadas para buscar dados dinâmicos e garantir uma experiência interativa na interface.

## 🚀 Como executar

1. Clone o repositório:
   ```bash
  git clone https://github.com/Juliano-Gomes/weather-app.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o projeto:
   ```bash
   npm run dev
   ```

## 📚 Sobre o desafio

O **150 Day Challenges** incentiva o desenvolvimento contínuo, com foco em boas práticas, organização e evolução técnica.

## 📄 Licença

Este projeto está sob a licença MIT.

---

Sinta-se à vontade para contribuir e sugerir melhorias!