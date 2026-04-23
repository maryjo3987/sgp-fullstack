package br.com.sgp.service;

import br.com.sgp.model.Projeto;
import br.com.sgp.model.Tarefa;
import br.com.sgp.model.Usuario;
import br.com.sgp.repository.ProjetoRepository;
import br.com.sgp.repository.TarefaRepository;
import br.com.sgp.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TarefaService {

    private final TarefaRepository repository;
    private final ProjetoRepository projetoRepository;
    private final UsuarioRepository usuarioRepository;

    public Tarefa salvar(Tarefa tarefa) {

        // buscar projeto
        if (tarefa.getProjeto() != null && tarefa.getProjeto().getIdProjeto() != null) {
            Projeto projeto = projetoRepository.findById(tarefa.getProjeto().getIdProjeto())
                    .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));
            tarefa.setProjeto(projeto);
        }

        // buscar usuários
        if (tarefa.getUsuarios() != null) {
            List<Usuario> usuarios = tarefa.getUsuarios().stream()
                    .map(u -> usuarioRepository.findById(u.getIdUsuario())
                            .orElseThrow(() -> new RuntimeException("Usuário não encontrado")))
                    .collect(Collectors.toList());

            tarefa.setUsuarios(usuarios);
        }

        return repository.save(tarefa);
    }

    public List<Tarefa> listar() {
        return repository.findAll();
    }

    public Tarefa buscarPorId(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public List<Tarefa> listarPorProjeto(Long idProjeto) {
    return repository.findByProjetoIdProjeto(idProjeto);
}

public Tarefa atualizar(Long id, Tarefa tarefa) {

    Tarefa existente = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));

    existente.setDescricao(tarefa.getDescricao());
    existente.setStatus(tarefa.getStatus());

    return repository.save(existente);
}
}