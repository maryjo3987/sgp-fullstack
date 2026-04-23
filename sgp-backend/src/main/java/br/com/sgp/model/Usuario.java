package br.com.sgp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    private String nome;

    private String descricao;

    @Column(unique = true)
    private String email;

    private String senha;

    private LocalDate dataNascimento;

    @Enumerated(EnumType.STRING)
    private StatusUsuario status;
}