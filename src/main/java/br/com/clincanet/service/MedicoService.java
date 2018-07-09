package br.com.clincanet.service;

import br.com.clincanet.domain.Medico;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Medico.
 */
public interface MedicoService {

    /**
     * Save a medico.
     *
     * @param medico the entity to save
     * @return the persisted entity
     */
    Medico save(Medico medico);

    /**
     * Get all the medicos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Medico> findAll(Pageable pageable);


    /**
     * Get the "id" medico.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Medico> findOne(Long id);

    /**
     * Delete the "id" medico.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
