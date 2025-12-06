# Manual de Implementação - Modal de Captura

Este guia explica como adicionar o Modal de Captura de Leads à sua Landing Page.

## 1. Hospedagem do Script

O arquivo `widget.js` precisa estar acessível publicamente na internet.
Como você já utiliza o Netlify, o ideal é que este arquivo seja servido junto com seu site ou em um deploy separado de "widgets".

**Se for subir junto com a LP:**
1.  Copie o arquivo `widget.js` para a pasta de assets da sua Landing Page (ex: `js/widget.js`).

**Se for usar via CDN/Externo:**
1.  Hospede o arquivo `widget.js` e obtenha a URL pública dele (ex: `https://seusite.com/widgets/modal-lead/widget.js`).

## 2. Adicionar o Script na Página

Adicione a seguinte linha no final do `<body>` da sua página HTML (antes do fechamento `</body>`):

```html
<!-- Widget Modal Lead -->
<script src="./caminho/para/seu/widget.js"></script>
```
*Ajuste o `src` conforme o local onde você salvou o arquivo.*

## 3. Configurar o Botão de Disparo

Para que o modal abra quando o cliente clicar em um botão, você deve adicionar o evento `onclick="window.lbOpenModal()"` ao botão desejado.

**Exemplo em um botão existente:**

```html
<!-- Antes -->
<a href="#contato" class="btn-cta">QUERO UM ORÇAMENTO</a>

<!-- Depois -->
<button class="btn-cta" onclick="window.lbOpenModal()">QUERO UM ORÇAMENTO</button>
```

> **Nota:** Se você usar a tag `<a>`, adicione `href="javascript:void(0)"` para evitar que a página role para o topo.

```html
<a href="javascript:void(0)" class="btn-cta" onclick="window.lbOpenModal()">QUERO UM ORÇAMENTO</a>
```

## 4. Configuração dos Webhooks (Segurança)

Para garantir a segurança das suas URLs do n8n, este widget usa uma função do Netlify como intermediário.

### Passo 1: Configurar Variáveis no Netlify
No painel do Netlify onde este widget está hospedado:
1.  Vá em **Site configuration > Environment variables**.
2.  Adicione as seguintes variáveis com as URLs reais dos seus webhooks:
    -   `N8N_WEBHOOK_LP_WD_INJ` (Para Contato)
    -   `N8N_WEBHOOK_LP_WD_INT_QUIZ` (Para Quiz)

### Passo 2: Deploy
Faça o deploy dos arquivos para o seu site Netlify (`widge-chat-tracking`). O script já está configurado para buscar a função em:
`https://widge-chat-tracking.netlify.app/.netlify/functions/submit-modal-lead`

### Dados Enviados (JSON)

O formato dos dados enviados para o seu Webhook permanece o mesmo:

**Webhook Contato (`N8N_WEBHOOK_LP_WD_INJ`):**
```json
{
  "lead": { "name": "...", "email": "...", "phone": "...", "cep": "..." },
  "tracking": { ... },
  "type": "contact" // Identificador
}
```

**Webhook Quiz (`N8N_WEBHOOK_LP_WD_INT_QUIZ`):**
```json
{
  "lead": { ... },
  "quiz": { ... },
  "tracking": { ... },
  "type": "quiz" // Identificador
}
```
