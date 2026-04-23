package br.com.sgp.service;

import br.com.sgp.model.Projeto;
import br.com.sgp.model.Usuario;
import br.com.sgp.repository.ProjetoRepository;
import br.com.sgp.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjetoService {

    private final ProjetoRepository repository;
    private final UsuarioRepository usuarioRepository;

    // 🔹 CREATE
    public Projeto salvar(Projeto projeto) {

        if (projeto.getResponsavel() != null && projeto.getResponsavel().getIdUsuario() != null) {

            Usuario usuario = usuarioRepository
                    .findById(projeto.getResponsavel().getIdUsuario())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            projeto.setResponsavel(usuario);
        }

        return repository.save(projeto);
    }

    // 🔹 READ
    public List<Projeto> listar() {
        return repository.findAll();
    }

    public Projeto buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));
    }

    // 🔹 DELETE
    public void deletar(Long id) {
        repository.deleteById(id);
    }

    // 🔹 UPDATE (CORRIGIDO)
    public Projeto atualizar(Long id, Projeto projeto) {

        Projeto existente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));

        existente.setNome(projeto.getNome());
        existente.setDescricao(projeto.getDescricao());
        existente.setStatus(projeto.getStatus());
        existente.setDataInicio(projeto.getDataInicio());
        existente.setDataConclusao(projeto.getDataConclusao());

        // 🔥 tratamento seguro do responsável
        if (projeto.getResponsavel() != null && projeto.getResponsavel().getIdUsuario() != null) {

            Usuario usuario = usuarioRepository
                    .findById(projeto.getResponsavel().getIdUsuario())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            existente.setResponsavel(usuario);
        }

        return repository.save(existente);
    }
}