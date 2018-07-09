package br.com.clincanet.service.impl;

import br.com.clincanet.service.MedicoService;
import br.com.clincanet.domain.Medico;
import br.com.clincanet.repository.MedicoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Medico.
 */
@Service
@Transactional
public class MedicoServiceImpl implements MedicoService {

    private final Logger log = LoggerFactory.getLogger(MedicoServiceImpl.class);

    private final MedicoRepository medicoRepository;

    public MedicoServiceImpl(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    /**
     * Save a medico.
     *
     * @param medico the entity to save
     * @return the persisted entity
     */
    @Override
    public Medico save(Medico medico) {
        log.debug("Request to save Medico : {}", medico);        return medicoRepository.save(medico);
    }

    /**
     * Get all the medicos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Medico> findAll(Pageable pageable) {
        log.debug("Request to get all Medicos");
        return medicoRepository.findAll(pageable);
    }


    /**
     * Get one medico by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Medico> findOne(Long id) {
        log.debug("Request to get Medico : {}", id);
        return medicoRepository.findById(id);
    }

    /**
     * Delete the medico by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Medico : {}", id);
        medicoRepository.deleteById(id);
    }
}
