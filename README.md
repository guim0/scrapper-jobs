# 🔍 Vagas SP / Brasil (v1.3.0)

Aplicação web leve, *mobile-first* e privacy-focused projetada para otimizar a busca por oportunidades de emprego em São Paulo e vagas Remotas no Brasil.

---

## 🚀 Funcionalidades Principais

* **📄 Parsing de CV 100% Local (PDF):** Processamento do currículo diretamente no navegador do dispositivo usando `pdf.js`. Nenhum dado ou documento é enviado para servidores externos.
* **🧠 Extração Avançada de Soft Skills:** Algoritmo baseado em Regex que analisa o contexto das descrições de experiências profissionais para extrair competências comportamentais (ex: liderança, gestão de crises, comunicação).
* **💼 Busca DUPLA no LinkedIn:**
  * **Aba de Vagas Oficial:** Gera queries Booleanas avançadas com filtros temporais de recência (últimos 5 dias / 24h).
  * **Posts do Feed:** Atalho direto para encontrar vagas publicadas informalmente por recrutadores no feed de notícias do LinkedIn.
* **📋 Modo Lista Interna:** Interface visual em cards dentro do próprio app com resumo das informações cruciais da oportunidade.
* **📥 Exportação de Vaga em PDF:** Utilitário integrado (`html2pdf.js`) para salvar os detalhes do card de vaga em PDF com um clique.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 / JavaScript (ES6+):** Lógica pura *client-side*.
* **Tailwind CSS:** Estilização responsiva otimizada para dispositivos móveis.
* **pdf.js (Mozilla):** Leitura e extração de texto de arquivos PDF.
* **html2pdf.js:** Conversão de elementos do DOM em documentos PDF.
* **GitHub Pages:** Deploy e hospedagem contínua.

---

## 📱 Como Executar

Não requer instalação de dependências ou ambiente Node.js.

1. Clone o repositório:
   ```bash
   git clone [https://github.com/SEU_USUARIO/NOME_DO_REPO.git](https://github.com/SEU_USUARIO/NOME_DO_REPO.git)