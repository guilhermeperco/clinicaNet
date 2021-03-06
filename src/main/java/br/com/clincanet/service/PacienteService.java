package br.com.clincanet.service;

import br.com.clincanet.domain.Paciente;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Paciente.
 */
public interface PacienteService {

    /**
     * Save a paciente.
     *
     * @param paciente the entity to save
     * @return the persisted entity
     */
    Paciente save(Paciente paciente);

    /**
     * Get all the pacientes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Paciente> findAll(Pageable pageable);


    /**
     * Get the "id" paciente.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Paciente> findOne(Long id);

    /**
     * Delete the "id" paciente.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
