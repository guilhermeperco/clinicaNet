package br.com.clincanet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import br.com.clincanet.domain.enumeration.Especialidade;

/**
 * A Medico.
 */
@Entity
@Table(name = "medico")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Medico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @NotNull
    @Column(name = "crm", nullable = false)
    private Long crm;

    @Enumerated(EnumType.STRING)
    @Column(name = "especialidades")
    private Especialidade especialidades;

    @OneToMany(mappedBy = "medico")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Consulta> medicos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private Contato contato;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Medico nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getCrm() {
        return crm;
    }

    public Medico crm(Long crm) {
        this.crm = crm;
        return this;
    }

    public void setCrm(Long crm) {
        this.crm = crm;
    }

    public Especialidade getEspecialidades() {
        return especialidades;
    }

    public Medico especialidades(Especialidade especialidades) {
        this.especialidades = especialidades;
        return this;
    }

    public void setEspecialidades(Especialidade especialidades) {
        this.especialidades = especialidades;
    }

    public Set<Consulta> getMedicos() {
        return medicos;
    }

    public Medico medicos(Set<Consulta> consultas) {
        this.medicos = consultas;
        return this;
    }

    public Medico addMedico(Consulta consulta) {
        this.medicos.add(consulta);
        consulta.setMedico(this);
        return this;
    }

    public Medico removeMedico(Consulta consulta) {
        this.medicos.remove(consulta);
        consulta.setMedico(null);
        return this;
    }

    public void setMedicos(Set<Consulta> consultas) {
        this.medicos = consultas;
    }

    public Contato getContato() {
        return contato;
    }

    public Medico contato(Contato contato) {
        this.contato = contato;
        return this;
    }

    public void setContato(Contato contato) {
        this.contato = contato;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Medico medico = (Medico) o;
        if (medico.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medico.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Medico{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", crm=" + getCrm() +
            ", especialidades='" + getEspecialidades() + "'" +
            "}";
    }
}
