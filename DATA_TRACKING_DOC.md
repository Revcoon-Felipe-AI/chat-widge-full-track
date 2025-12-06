# Documentação de Rastreamento de Dados (Data Tracking)

Este documento detalha como os widgets (`modal-form-lead` e `chat-widget`) capturam, processam e enviam dados dos usuários.

## 1. Como os dados são capturados?

A captura de dados ocorre em três frentes:

1.  **Input do Usuário**: Dados inseridos manualmente nos formulários (Nome, WhatsApp, E-mail, CEP, Respostas do Quiz).
2.  **Parâmetros de URL (Query Params)**: O script lê automaticamente a URL da página onde o widget está instalado para capturar UTMs e IDs de clique de anúncios.
3.  **Cookies do Navegador**: O script lê cookies específicos (`_fbp`, `_fbc`, etc.) armazenados pelo Pixel do Facebook, TikTok, etc.
4.  **Geração Automática**: O script gera um `event_id` único para cada sessão usando `crypto.randomUUID()` para permitir a deduplicação de eventos (CAPI).

## 2. Quais dados são capturados?

### A. Dados do Lead (Contato)
| Campo | Descrição | Origem |
|-------|-----------|--------|
| `name` | Nome completo do usuário | Input |
| `email` | E-mail do usuário | Input |
| `phone` | Telefone (WhatsApp) com máscara | Input |
| `cep` | Código Postal (CEP) com máscara | Input |

### B. Dados de Rastreamento (Tracking)

#### Identificadores e Meta
| Campo | Descrição | Origem |
|-------|-----------|--------|
| `event_id` | ID único (UUID) para deduplicação de eventos (Server-Side) | Gerado Automaticamente |
| `conversion_platform` | Plataforma de origem atribuída (ex: `google_ads`, `facebook_ads`) | Lógica Interna |
| `device_os` | Sistema Operacional (Apple, Windows, Android, Linux) | `navigator.userAgent` |
| `device_type` | Tipo de Dispositivo (Mobile, Tablet, Desktop) | `navigator.userAgent` |
| `url_lead` | URL completa da página de conversão | `window.location.href` |
| `user_agent` | Informações do navegador e dispositivo | `navigator.userAgent` |

#### IDs de Plataformas de Anúncio (Click IDs)
| Campo | Descrição | Plataforma |
|-------|-----------|------------|
| `fbclid` | Facebook Click ID | Facebook / Instagram |
| `gclid` | Google Click ID | Google Ads |
| `ttclid` | TikTok Click ID | TikTok Ads |
| `wbraid` | Web Click ID (iOS privacy) | Google Ads |
| `gbraid` | App Click ID (iOS privacy) | Google Ads |
| `msclid` | Microsoft Click ID | Bing / Microsoft Ads |
| `li_fat_id` | LinkedIn Click ID | LinkedIn Ads |
| `epik` | Pinterest Click ID | Pinterest Ads |

#### Cookies de Rastreamento
| Campo | Descrição | Cookie Lido |
|-------|-----------|-------------|
| `fbp` | Facebook Browser ID | `_fbp` |
| `fbc` | Facebook Click ID (Cookie) | `_fbc` |
| `ttp` | TikTok Pixel Cookie | `_ttp` |
| `epik_cookie` | Pinterest Cookie | `_epik` |
| `gcl_au` | Google AdSense/Analytics | `_gcl_au` |

#### Parâmetros UTM (Campanha)
| Campo | Descrição |
|-------|-----------|
| `utm_source` | Origem do tráfego (ex: google, facebook, newsletter) |
| `utm_medium` | Meio de marketing (ex: cpc, email, banner) |
| `utm_campaign` | Nome da campanha |
| `utm_term` | Termo de pesquisa (palavra-chave) |
| `utm_content` | Conteúdo do anúncio (criativo) |

## 3. Estrutura do JSON Enviado

O payload JSON enviado para o Webhook (via Netlify Function) segue esta estrutura padronizada:

```json
{
  "lead": {
    "name": "João da Silva",
    "email": "joao@exemplo.com",
    "phone": "(11) 99999-9999",
    "cep": "01001-000",
    "interest": "Orçamentos", // (Apenas Chat Widget)
    "projectType": "Churrasqueira Automatizada" // (Apenas Chat Widget)
  },
  "survey": {
    // Respostas do Quiz (Chave: ID da Pergunta, Valor: Resposta)
    "custom-qntd-pessoas-1-14": "Costumo fazer churrasco para 10 a 20 pessoas",
    "custom-tipo-preparo-1-13": "Picanha, Costela",
    "custom-possui-barra-1-12": "Minha churrasqueira possui barra frontal",
    "custom-text-perfect-bbq": "Não pode faltar Cortes Nobres, Não pode faltar Bebida Gelada",
    "custom-text-project-vision": "Prioridade é Estética, Prioridade é Funcionalidade (Sistema completo)"
  },
  "tracking": {
    "event_id": "550e8400-e29b-41d4-a716-446655440000",
    "conversion_platform": "facebook_ads",
    "utm_source": "facebook",
    "utm_medium": "cpc",
    "utm_campaign": "verao_2025",
    "utm_term": "",
    "utm_content": "video_churrasco_1",
    "fbclid": "IwAR0...",
    "gclid": "",
    "ttclid": "",
    "wbraid": "",
    "gbraid": "",
    "msclid": "",
    "li_fat_id": "",
    "epik": "",
    "fbp": "fb.1.16...",
    "fbc": "fb.1.16...",
    "ttp": "...",
    "epik_cookie": "...",
    "gcl_au": "...",
    "url_lead": "https://seusite.com.br/landing-page",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)..."
  }
}
```

## 4. Lógica de Atribuição (`conversion_platform`)

O sistema define a plataforma de conversão com base na prioridade dos parâmetros encontrados na URL:

1.  **Google Ads**: Se encontrar `gclid`, `wbraid` ou `gbraid`.
2.  **Facebook/Instagram Ads**: Se encontrar `fbclid`.
3.  **TikTok Ads**: Se encontrar `ttclid`.
4.  **Bing Ads**: Se encontrar `msclid`.
5.  **LinkedIn Ads**: Se encontrar `li_fat_id`.
6.  **UTM Source**: Se não houver IDs de clique, usa o valor de `utm_source`.
7.  **Orgânico**: Se não houver nenhum parâmetro, define como `organic`.
