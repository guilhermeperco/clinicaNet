package br.com.clincanet.service;

import br.com.clincanet.domain.Contato;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Contato.
 */
public interface ContatoService {

    /**
     * Save a contato.
     *
     * @param contato the entity to save
     * @return the persisted entity
     */
    Contato save(Contato contato);

    /**
     * Get all the contatoes.
     *
     * @return the list of entities
     */
    List<Contato> findAll();


    /**
     * Get the "id" contato.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Contato> findOne(Long id);

    /**
     * Delete the "id" contato.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
