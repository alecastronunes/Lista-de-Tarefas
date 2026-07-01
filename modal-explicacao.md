# Modais em React: por item vs global

Ao trabalhar com listas no React, é comum surgir a dúvida sobre onde colocar o modal e como controlar a abertura dele.

## 1. Modal por item

Esse tipo de modal é renderizado dentro de cada item da lista.

Ou seja, cada tarefa, card ou componente da lista possui o seu próprio bloco de renderização do modal.

### Exemplo mental

- cada item da lista “sabe” se deve mostrar ou não o modal
- o modal fica associado ao componente daquele item

### Características

- mais simples de começar
- o código fica próximo do item que o disparou
- pode gerar repetição
- se a condição de abertura não for bem controlada, o modal pode aparecer em vários lugares ao mesmo tempo

### Quando usar

- quando a interface for bem simples
- quando o modal é muito local e não precisa ser compartilhado

### Exemplo de código

```tsx
function Lista() {
  const [isOpen, setIsOpen] = useState(false);

  const tarefas = [
    { id: 1, nome: "Estudar React" },
    { id: 2, nome: "Fazer compras" },
  ];

  return (
    <div>
      {tarefas.map((tarefa) => (
        <div key={tarefa.id}>
          <span>{tarefa.nome}</span>
          <button onClick={() => setIsOpen(true)}>Editar</button>

          {isOpen && (
            <div style={{ border: "1px solid black", marginTop: 8 }}>
              <p>Modal para {tarefa.nome}</p>
              <button onClick={() => setIsOpen(false)}>Fechar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

### O que acontece aqui

- o modal existe dentro de cada item
- se `isOpen` for `true`, ele pode aparecer em todos os lugares que usam essa mesma condição

Ou seja, esse modelo é fácil de começar, mas pode ficar confuso.

---

## 2. Modal global

Nesse modelo, o modal é renderizado uma única vez no componente pai ou em um componente central.

Em vez de cada item ter o seu próprio modal, o componente principal controla:

- se o modal está aberto
- qual item foi selecionado

### Exemplo mental

- o usuário clica em “Editar” em uma tarefa
- o componente guarda essa tarefa em estado
- o modal é exibido uma vez com os dados dessa tarefa

### Características

- mais limpo e organizado
- evita duplicação de código
- facilita o controle de estado
- é mais escalável para projetos maiores

### Quando usar

- quando o modal é usado para editar, visualizar ou confirmar ações de um item específico
- quando você quer manter o fluxo mais previsível

### Exemplo de código

```tsx
function Lista() {
  const [isOpen, setIsOpen] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  const tarefas = [
    { id: 1, nome: "Estudar React" },
    { id: 2, nome: "Fazer compras" },
  ];

  function abrirModal(tarefa: any) {
    setTarefaSelecionada(tarefa);
    setIsOpen(true);
  }

  return (
    <div>
      {tarefas.map((tarefa) => (
        <div key={tarefa.id}>
          <span>{tarefa.nome}</span>
          <button onClick={() => abrirModal(tarefa)}>Editar</button>
        </div>
      ))}

      {isOpen && tarefaSelecionada && (
        <div style={{ border: "1px solid black", marginTop: 8 }}>
          <p>Editando: {tarefaSelecionada.nome}</p>
          <button onClick={() => setIsOpen(false)}>Fechar</button>
        </div>
      )}
    </div>
  );
}
```

### O que acontece aqui

- existe apenas um modal
- ele usa `tarefaSelecionada` para saber qual item está sendo editado
- isso deixa o fluxo mais organizado

---

## Diferença prática

A principal diferença está no controle do estado:

- no modal por item, o modal está ligado diretamente ao item
- no modal global, o estado do modal é controlado de forma centralizada

---

## Regra prática

Se você estiver trabalhando com uma lista e quiser abrir um modal para editar um item específico, geralmente o melhor é usar:

- um estado para guardar o item selecionado
- um estado para indicar se o modal está aberto
- um único modal renderizado no componente principal

Isso deixa o código mais organizado e facilita a manutenção.

---

## Resumo rápido

- Modal por item: mais local, mais simples, mas pode ficar repetido e confuso.
- Modal global: mais organizado, centralizado e melhor para listas maiores.

## Conclusão

Em projetos pequenos, o modal por item pode ser suficiente. Mas, à medida que a aplicação cresce, o modal global costuma ser a escolha mais limpa, porque separa melhor a responsabilidade do estado e evita problemas como modal aparecendo em vários itens ao mesmo tempo.
