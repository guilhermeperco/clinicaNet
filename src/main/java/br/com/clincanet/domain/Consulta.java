package br.com.clincanet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Consulta.
 */
@Entity
@Table(name = "consulta")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Consulta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_hora")
    private LocalDate dataHora;

    @Column(name = "anotacoes_do_medico")
    private String anotacoesDoMedico;

    @ManyToOne
    @JsonIgnoreProperties("pacientes")
    private Paciente paciente;

    @ManyToOne
    @JsonIgnoreProperties("medicos")
    private Medico medico;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataHora() {
        return dataHora;
    }

    public Consulta dataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
    }

    public String getAnotacoesDoMedico() {
        return anotacoesDoMedico;
    }

    public Consulta anotacoesDoMedico(String anotacoesDoMedico) {
        this.anotacoesDoMedico = anotacoesDoMedico;
        return this;
    }

    public void setAnotacoesDoMedico(String anotacoesDoMedico) {
        this.anotacoesDoMedico = anotacoesDoMedico;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Consulta paciente(Paciente paciente) {
        this.paciente = paciente;
        return this;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Medico getMedico() {
        return medico;
    }

    public Consulta medico(Medico medico) {
        this.medico = medico;
        return this;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
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
        Consulta consulta = (Consulta) o;
        if (consulta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), consulta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Consulta{" +
            "id=" + getId() +
            ", dataHora='" + getDataHora() + "'" +
            ", anotacoesDoMedico='" + getAnotacoesDoMedico() + "'" +
            "}";
    }
}
