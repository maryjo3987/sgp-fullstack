package br.com.sgp.controller;

import br.com.sgp.model.Projeto;
import br.com.sgp.service.ProjetoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projetos")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProjetoController {

    private final ProjetoService service;

    @PostMapping
    public Projeto criar(@RequestBody Projeto projeto) {
        return service.salvar(projeto);
    }

    @GetMapping
    public List<Projeto> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Projeto buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    @PutMapping("/{id}")
    public Projeto atualizar(@PathVariable Long id, @RequestBody Projeto projeto) {
        return service.atualizar(id, projeto);
    }
}

