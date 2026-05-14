# Skill: Atualizar Documentação

## Objetivo

Atualizar a página de documentação do sistema com base no código atual do projeto.

Use esta skill quando o usuário pedir algo como:

- "use a skill de atualizar documentação"
- "atualize a página /documentacao"
- "sincronize a documentação com o código atual"

## Fonte da verdade

A fonte da verdade é sempre o código atual do projeto.

Se houver divergência entre o código e a documentação existente, o código vence.

## Arquivo permitido

Você só pode alterar este arquivo:

- `src/pages/documentacao/index.js`

Não altere:
- APIs
- migrations
- banco de dados
- autenticação
- componentes globais
- Navbar
- rotas
- layout global
- estilos globais
- outros arquivos

## Tipo de documentação

A documentação deve ser em nível de usuário final.

Documente apenas comportamentos, funcionalidades, fluxos e limitações que afetam diretamente o usuário.

Pense como documentação equivalente a:
- requisitos funcionais
- casos de uso
- fluxos do usuário
- regras visíveis para o usuário
- permissões percebidas pelo usuário
- limitações atuais do sistema

Não transforme a página em documentação técnica.

Evite mencionar:
- nomes internos de funções
- nomes internos de componentes
- nomes de middlewares
- nomes de variáveis
- detalhes de implementação
- payloads internos
- queries SQL
- nomes de arquivos internos
- estrutura de diretórios

Só mencione algo técnico se isso afetar diretamente o usuário.

## Como atualizar

1. Leia o conteúdo atual de:

- `src/pages/documentacao/index.js`

2. Analise a base de código atual, principalmente:

- páginas existentes
- fluxos acessíveis ao usuário
- rotas disponíveis
- Navbar/menu
- formulários
- validações visíveis
- mensagens de sucesso/erro
- permissões de acesso
- funcionalidades completas
- funcionalidades parcialmente implementadas
- limitações visíveis ao usuário

3. Compare o conteúdo atual da documentação com o comportamento real do sistema.

4. Atualize somente o que estiver:
- desatualizado
- incorreto
- incompleto
- contraditório com o código atual
- faltando na documentação

5. Preserve ao máximo:
- estrutura visual existente
- organização por Accordions
- tom didático
- linguagem simples
- componentes já usados
- padrão visual atual da página

Evite reescrever a página inteira sem necessidade.

## Regra principal

Não invente funcionalidade futura.

Documente apenas o que existe hoje no código.

Se algo estiver preparado no front-end, mas ainda não funcionar completamente para o usuário, documente como limitação ou funcionalidade parcial.

Exemplo:
- se o botão existe, mas a ação não funciona, documente em "Limitações atuais"
- se uma tela existe, mas ainda é placeholder, documente como limitação
- se uma rota existe, mas não está acessível ao usuário, não trate como funcionalidade pronta

## Seção de limitações atuais

A documentação deve manter uma seção chamada:

- "Limitações atuais"

Essa seção é importante e não deve ser removida.

Ela deve listar funcionalidades que existem parcialmente, estão visíveis ao usuário, ou ainda não foram implementadas completamente.

Exemplos de itens possíveis:
- "A página inicial ainda não possui conteúdo."
- "A página Sobre ainda é simples."
- "A ação de copiar tarefa ainda não está implementada."
- "A ação de baixar arquivo ainda não está implementada."

Atualize essa lista conforme o código atual.

Se uma limitação foi resolvida no código, remova ou ajuste o item.

Se uma nova limitação visível ao usuário foi encontrada, adicione.

## Inconsistências

Durante a análise, identifique inconsistências entre a documentação atual e o código.

Exemplos:
- documentação diz que tarefa pertence diretamente ao usuário, mas o código agora mostra que tarefa pertence a um espaço
- documentação fala de uma ação que não existe mais
- documentação omite uma nova tela acessível pela Navbar
- documentação menciona uma limitação que já foi resolvida
- documentação diz que algo está disponível, mas o código mostra que ainda é placeholder

Se possível, corrija a inconsistência diretamente na documentação.

Se a inconsistência não puder ser resolvida com segurança, mantenha uma indicação discreta em "Limitações atuais" ou ajuste o texto para não afirmar algo incorreto.

## Escopo do conteúdo

A documentação deve cobrir, quando existir no código:

### Acesso ao sistema
- criar conta
- login
- logout
- rotas que exigem autenticação
- comportamento quando usuário não está logado

### Tarefas
- listar tarefas
- criar tarefa
- editar tarefa
- excluir tarefa
- regras obrigatórias
- mensagens comuns
- vínculo da tarefa com usuário ou espaço, conforme o código atual

### Arquivos
- anexar arquivos
- listar arquivos
- abrir arquivo
- copiar link
- excluir arquivo
- formatos aceitos
- tamanho máximo
- limitações de download, se ainda existirem

### Espaços
- criar espaço
- editar espaço
- listar espaços
- escolher ícone
- nome
- descrição
- sigla
- relação entre espaços e tarefas, se já existir no código
- limitações da aba Quadro, se ainda for placeholder

### Documentação
- explicar que a própria tela serve como guia de uso do sistema

### Tema
- alternar modo claro/escuro, se estiver implementado
- persistência da escolha, se for visível ao usuário

### Navegação
- itens disponíveis no menu
- dropdown de espaços, se estiver implementado
- comportamento relevante para usuário

## Linguagem

Use português brasileiro.

Use linguagem simples, clara e direta.

Evite termos técnicos quando houver uma alternativa mais simples.

Exemplo:
Prefira:
- "Você pode criar, editar e excluir tarefas."

Evite:
- "O módulo de tarefas consome endpoints autenticados via camada HTTP."

## Critérios de aceite

Ao finalizar:

- Apenas `src/pages/documentacao/index.js` foi alterado.
- A documentação reflete o comportamento real do código atual.
- A seção "Limitações atuais" continua existindo.
- Funcionalidades incompletas não são descritas como prontas.
- Funcionalidades removidas não continuam documentadas.
- Novas funcionalidades visíveis ao usuário foram adicionadas.
- O tom continua sendo de usuário final.
- Não foram adicionados detalhes técnicos desnecessários.
- Não houve alteração de layout global, APIs, banco ou autenticação.

## Resposta final esperada

Depois de atualizar, informe:

- quais seções foram alteradas
- quais inconsistências foram encontradas
- quais limitações foram adicionadas, removidas ou mantidas
- confirmação de que apenas `src/pages/documentacao/index.js` foi alterado