# Widget Modal de Captura de Leads

Este diretório contém o código fonte do widget de modal para captura de leads e qualificação via quiz.

## Estrutura de Arquivos

- **`widget.js`**: O núcleo do widget. Contém toda a lógica, estilos (CSS injetado) e integração com Webhooks.
- **`index.html`**: Uma página de demonstração para testar o funcionamento do modal localmente.
- **`MANUAL_IMPLEMENTACAO.md`**: Guia passo a passo para adicionar este widget à sua Landing Page.

## Funcionalidades

1.  **Captura em Duas Etapas**:
    -   **Etapa 1**: Coleta Nome, E-mail e WhatsApp. Envia para o Webhook 1.
    -   **Etapa 2**: Quiz de qualificação (Tipo de churrasqueira, Interesses, Prazo). Envia para o Webhook 2.
2.  **Integração com Webhooks**: Envia os dados via POST JSON para URLs configuráveis (n8n, Zapier, Make, etc).
3.  **Rastreamento (Tracking)**: Coleta automaticamente parâmetros UTM da URL e cookies de rastreamento (Facebook Pixel, TikTok, Google Ads) se disponíveis.
4.  **Design Responsivo**: Funciona bem em Desktop e Mobile, com visual moderno e clean.
5.  **Máscaras de Input**: Formatação automática para Celular e validação básica.

## Configuração Segura (Netlify Functions)

Este widget utiliza uma **Netlify Function** para ocultar as URLs dos seus Webhooks, garantindo maior segurança.

### 1. Variáveis de Ambiente (Netlify)

No painel do Netlify, vá em **Site settings > Environment variables** e adicione:

- `N8N_WEBHOOK_LP_WD_INJ`: URL do Webhook para dados de contato.
- `N8N_WEBHOOK_LP_WD_INT_QUIZ`: URL do Webhook para respostas do quiz.

### 2. URL do Backend

O widget já está configurado para apontar para `https://widge-chat-tracking.netlify.app/.netlify/functions/submit-modal-lead`.

Certifique-se de que este diretório (`widgets/modal-form-lead`) seja implantado neste site ou que a função `submit-modal-lead.js` esteja acessível nesta URL.

## Como Testar

1.  Abra o arquivo `index.html` no seu navegador.
2.  Clique no botão "SOLICITAR ORÇAMENTO".
3.  Preencha o formulário e siga o fluxo.
4.  Verifique o console do navegador (F12) para ver os logs de envio de dados.
