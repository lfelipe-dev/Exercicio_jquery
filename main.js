$(document).ready(function(){
    var contador = 0;

    $('#btn-enviar').click(function(){
        const nomeTarefa = $('#nome-tarefa').val();
        const inicioTarefa = new Date($('#inicio-tarefa').val()).toLocaleDateString('pt-BR', 'short');
        const fimTarefa = new Date($('#fim-tarefa').val()).toLocaleDateString('pt-BR', 'short');
        const detalhesTarefa = $('#detalhes-tarefa').val();

        const tarefasSalvas = $('#lista-tarefas');

        if (inicioTarefa > fimTarefa) {
            Swal.fire('A data final deve ser maior que a data inicial.');
        } else if (!nomeTarefa || !inicioTarefa || !fimTarefa) {
            Swal.fire('Tarefa, Data Inicial e Data final são campos Obrigatórios');
        } else {
            const novaTarefa = $(`
                <ul id="tarefa">
                    <li id="tarefa-titulo">
                        <label for="nome-tarefa">Tarefa:</label>
                        <textarea class="nome-tarefa-salva" disabled>${nomeTarefa}</textarea>
                        <img src="./imagens/complete.png" class="concluir" title="Concluir tarefa" alt="Concluir tarefa">
                        <img src="./imagens/lixeira.png" class="excluir" title="Excluir tarefa" alt="Excluir tarefa">
                    </li>
                    <li class="tarefa-inicio-fim">
                        <label for="inicio-tarefa">Início:</label>
                        <input type="text" class="inicio-tarefa-salva" value="${inicioTarefa}" disabled>
                        <label for="fim-tarefa">Fim:</label>
                        <input type="text" class="fim-tarefa-salva" value="${fimTarefa}" disabled>
                    </li>
                    <li>
                        <label for="detalhes-tarefa">Detalhes:</label>
                        <textarea class="detalhes-tarefa-salva" disabled>${detalhesTarefa}</textarea>
                    </li>
                </ul>
            `);

            $(novaTarefa).appendTo(tarefasSalvas);

            // Função para concluir tarefa
            novaTarefa.find('.concluir').click(function() {
                $(this).closest('#tarefa').find('textarea, input').css('text-decoration', 'line-through');
            });

            // Função para excluir tarefa
            novaTarefa.find('.excluir').click(function() {
                $(this).closest('#tarefa').remove();
                contador--;
                if (contador === 1) {
                    $('#qtdTarefas').html(`Você tem <b>${contador}</b> tarefa.`);
                } else {
                    $('#qtdTarefas').html(`Você tem <b>${contador}</b> tarefas.`);
                }
            });

            $('#nome-tarefa').val('');
            $('#inicio-tarefa').val('');
            $('#fim-tarefa').val('');
            $('#detalhes-tarefa').val('');

            contador++;

            if (contador === 1) {
                $('#qtdTarefas').html(`Você tem <b>${contador}</b> tarefa.`);
            } else {
                $('#qtdTarefas').html(`Você tem <b>${contador}</b> tarefas.`);
            }
        }
    });
});