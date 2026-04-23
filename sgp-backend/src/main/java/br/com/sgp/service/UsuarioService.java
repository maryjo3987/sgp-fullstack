package br.com.sgp.service;

import br.com.sgp.model.Usuario;
import br.com.sgp.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repository;

    public Usuario salvar(Usuario usuario) {
        return repository.save(usuario);
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public Usuario atualizar(Long id, Usuario usuario) {
    Usuario existente = repository.findById(id).orElseThrow();

    existente.setNome(usuario.getNome());
    existente.setDescricao(usuario.getDescricao());
    existente.setEmail(usuario.getEmail());
    existente.setSenha(usuario.getSenha());
    existente.setDataNascimento(usuario.getDataNascimento());
    existente.setStatus(usuario.getStatus());

    return repository.save(existente);
}
}