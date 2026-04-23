package br.com.sgp.repository;

import br.com.sgp.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    List<Tarefa> findByProjetoIdProjeto(Long idProjeto);
}