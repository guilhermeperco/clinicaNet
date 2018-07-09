package br.com.clincanet.service;

import br.com.clincanet.domain.Consulta;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Consulta.
 */
public interface ConsultaService {

    /**
     * Save a consulta.
     *
     * @param consulta the entity to save
     * @return the persisted entity
     */
    Consulta save(Consulta consulta);

    /**
     * Get all the consultas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Consulta> findAll(Pageable pageable);


    /**
     * Get the "id" consulta.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Consulta> findOne(Long id);

    /**
     * Delete the "id" consulta.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
